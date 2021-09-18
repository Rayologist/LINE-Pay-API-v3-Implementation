import crypto from "crypto";

class Signature {
  constructor(secretKey, uri, nonce) {
    this.secretKey = secretKey;
    this.uri = uri;
    this.nonce = nonce;
    this.hmac = crypto.createHmac("sha256", secretKey);
  }

  _generate_signature(queryContent) {
    const rawSignature = this.secretKey + this.uri + queryContent + this.nonce;
    return this.hmac.update(rawSignature).digest("base64");
  }

  generateGetSignature(queryObject) {
    const queryString = Object.keys(queryObject)
      .map((key) => `${key}=${queryObject[key]}`)
      .join("&");

    return this._generate_signature(queryString);
  }

  generatePostSignature(queryObject) {
    const requestBody = JSON.stringify(queryObject);

    return this._generate_signature(requestBody);
  }
}

export default Signature;
