import QuickCrypto from "react-native-quick-crypto";

function encodeBase64Url(uintArray: Uint8Array) {
  return btoa(String.fromCharCode(...uintArray))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/\=/g, "");
}

// function decodeBase64Url(b64urlString: string) {
//   return new Uint8Array(
//     atob(b64urlString.replace(/-/g, "+").replace(/_/g, "/"))
//       .split("")
//       .map((char) => char.charCodeAt(0))
//   );
// }

// Encrypt data
export async function encryptDataToToken(data: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await QuickCrypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    "AES-GCM",
    false,
    ["encrypt"]
  );

  const iv = QuickCrypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await QuickCrypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encoder.encode(data)
  );

  return `${encodeBase64Url(new Uint8Array(encryptedData))}.${encodeBase64Url(
    iv as unknown as Uint8Array
  )}`;
}

// // Decrypt data
// export async function decryptTokenToData(token: string, secret: string) {
//   const encoder = new TextEncoder();
//   const key = await crypto.subtle.importKey(
//     "raw",
//     encoder.encode(secret),
//     "AES-GCM",
//     false,
//     ["decrypt"]
//   );

//   const [encodedData, encodedIv] = token.split(".");
//   const iv = decodeBase64Url(encodedIv);
//   const encryptedData = decodeBase64Url(encodedData);

//   const decryptedData = await crypto.subtle.decrypt(
//     {
//       name: "AES-GCM",
//       iv: iv.buffer,
//     },
//     key,
//     encryptedData
//   );

//   const decoder = new TextDecoder();

//   return decoder.decode(decryptedData);
// }
