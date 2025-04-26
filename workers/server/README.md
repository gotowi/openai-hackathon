# Agents FastAPI Server

A FastAPI-based server for handling agents requests.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Installation

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Environment Setup

1. Create a `.env` file in the server directory:
```bash
touch .env
```

2. Add your OpenAI API key to the `.env` file:
```
OPENAI_API_KEY=your_api_key_here
```

## Running the Server

1. Make sure your virtual environment is activated
2. Start the server:
```bash
python -m fastapi dev main.py
```

The server will start at `http://localhost:8000`
