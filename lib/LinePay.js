import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";
import Auth from "./auth/auth.js";

const PRODUCTION_URL = "https://api-pay.line.me";
const SANDBOX_URL = "https://sandbox-api-pay.line.me";

class LinePay {
  constructor(channelId, secretKey, isProduction = true) {
    this.channelId = channelId;
    this.secretKey = secretKey;
    this.BASE_URL = isProduction ? PRODUCTION_URL : SANDBOX_URL;
  }

  generateHeader(method, uri, queryObj) {
    const nonce = uuidv4();
    const auth = new Auth(this.channelId, this.secretKey);
    return auth.generateHeader({ method, uri, nonce, queryObj });
  }

}

export default LinePay;
