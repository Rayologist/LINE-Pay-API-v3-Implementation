import LinePayHeader from "./header.js";
import Signature from "./signature.js";

class Auth {
  constructor(channelId, secretKey) {
    this.channelId = channelId;
    this.secretKey = secretKey;
  }

  generateHeader(authContent) {
    const { method, uri, nonce, queryObj } = authContent;
    const signature = new Signature(this.secretKey, uri, nonce);
    let signed;
    if (method.toLowerCase() === "post") {
      signed = signature.generatePostSignature(queryObj);
    } else if (method.toLowerCase() === "get") {
      signed = signature.generateGetSignature(queryObj);
    }

    const linePayHeader = new LinePayHeader(this.channelId, signed, nonce);

    return linePayHeader.generate();
  }
}

export default Auth;
