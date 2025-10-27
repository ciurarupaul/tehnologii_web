import crypto from "crypto-js";

let word1 = "word1";

let crypt = crypto.AES.encrypt(
  JSON.stringify(word1),
  "secret key 123"
).toString();

console.log(crypt);

let bytes = crypto.AES.decrypt(crypt, "secret key 123");
let decrypt = JSON.parse(bytes.toString(crypto.enc.Utf8));

console.log(decrypt);
