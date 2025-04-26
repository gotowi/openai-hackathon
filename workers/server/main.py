import asyncio
from fastapi import FastAPI
from enum import Enum
from pydantic import BaseModel
from typing import Optional
from agents import Agent, ItemHelpers, Runner, trace, WebSearchTool, function_tool
import requests
from datetime import datetime

class PreparerOutput(BaseModel):
    ready_to_execute: bool    
    missing_info: Optional[list[str]]

class Tool(str, Enum):
    browser = 'browser'

class Step(BaseModel):
    tool: Tool
    "The tool to use to execute the todo."

    reason: str
    "Your reasoning for why this step is important to the todo."

    query: str
    "The query to use for the tool."

class Plan(BaseModel):
    steps: list[Step]
    """A list of steps to execute the todo."""

class AnalyzerOutput(BaseModel):
    is_doable: bool
    """Whether the todo can be executed by agents."""

analyzer = Agent(
    name="analyzer",
    instructions="You analyze if the todo is doable by digital agents. For example, if the todo is to buy a house, it's not doable by digital agents, so you should return False. But if the todo is to find a flight ticket, it's doable by digital agents, so you should return True.",
    output_type=AnalyzerOutput,
)

@function_tool(
    name_override="notion_lookup_tool", description_override="Lookup information in Notion."
)
async def notion_lookup_tool() -> str:
    requests.get("https://api.notion.com/v1/search", headers={
        "Authorization": f"Bearer {os.getenv('NOTION_API_KEY')}",
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
    })

preparer = Agent(
    name="preparer",
    # THANKS KATIA :))
    instructions="""Your goal is to determine if the user has provided all the essential information needed to perform the action.
The first step is to determine what type of information is relevant for the task, then which pieces of information are critical to get the task done and which are just nice to haves.
If the user provides a nice to have info, you can record it, but you don't need all the nice to haves to continue with the task, only the critical ones.
For example, if you want to book a hotel room, the minimal info you need is the destination, the check in and check out dates and the number of guests. Some nice to haves would be the type of room, the star rating of the hotel, the price range, etc.
Once you have the destination, dates and number of guests, you can continue with the task, and then ask for clarification on the nice to haves later if needed.""",
    output_type=PreparerOutput,
    # tools=[notion_lookup_tool],
)

executor = Agent(
    name="executor",
    instructions="You execute the todo.",
    tools=[WebSearchTool()],
)

app = FastAPI()

class Payload(BaseModel):
    id: int
    value: str
    
def update(todo_id: str, payload: dict):
    # Send a request to the manager to propagate the results to user and db
    requests.patch(f"https://openai-hackathon-manager.konrad-kalemba24.workers.dev/update/{todo_id}", json=payload)

@app.post("/")
async def act(payload: Payload):
    todo_id = payload.id
    todo_value = payload.value

    print(f"Todo ID: {todo_id}")
    print(f"Todo value: {todo_value}")

    if not todo_value:
        return {"result": "Todo value is required"}

    update(todo_id, {
        "status": "analyzing",
    })

    analyzer_output = await Runner.run(
        analyzer,
        todo_value,
    )

    analyzer_output = analyzer_output.final_output_as(AnalyzerOutput)

    update(todo_id, {
        "doableByAi": analyzer_output.is_doable,
    })

    if not analyzer_output.is_doable:
        return {"result": "Todo is not doable by digital agents"}

    update(todo_id, {
        "status": "preparing",
    })

    preparer_output = await Runner.run(
        preparer,
        todo_value,
    )

    preparer_output = preparer_output.final_output_as(PreparerOutput)


    if not preparer_output.ready_to_execute:
        update(todo_id, {
            "status": "missing_context",
            "missingContext": preparer_output.missing_info,
        })
        return {"result": "Todo is not ready to be executed"}

    update(todo_id, {
        "status": "executing",
    })

    executor_output = await Runner.run(
        executor,
        todo_value,
    )

    update(todo_id, {
        "status": "done",
        "result": executor_output.final_output,
    })

    return {"result": "Todo is ready to be executed"}

# async def main():
#     msg = "Find a flight ticket prices from Warsaw to Tokyo for 2 people on 2025-05-01 in economy class"

#     # print(f"Message: {msg}")
#     # Ensure the entire workflow is a single trace
#     with trace("Task"):
#         preparer_output = await Runner.run(
#             preparer,
#             msg,
#         )
#         preparer_output = preparer_output.final_output_as(PreparerOutput)

#         if not preparer_output.ready_to_execute:
#             print(f"Missing info: {preparer_output.missing_info}")
#             return

#         print(f"Ready to execute: {preparer_output.ready_to_execute}")

#         executor_output = await Runner.run(
#             executor,
#             msg,
#         )

#         print(f"Executor output: {executor_output}")
#         # if preparer_output.ready_to_execute:
#         #     plan = await Runner.run(
#         #         planner,
#         #         msg,
#         #     )
#         #     plan = plan.final_output_as(Plan)
#         #     print(f"Plan: {plan.steps}")


# if __name__ == "__main__":
#     asyncio.run(main())