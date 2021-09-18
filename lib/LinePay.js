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

  async request(queryContent) {
    try {
      const uri = "/v3/payments/request";
      const header = this.generateHeader("POST", uri, queryContent);

      const resp = await fetch(BASE_URL + uri, {
        method: "POST",
        body: JSON.stringify(queryContent),
        headers: header,
      });
      return await resp.json();
    } catch (error) {
      console.error(error);
    }
  }

  async confirm(queryContent, transactionId) {
    try {
      const uri = `/v3/payments/${transactionId}/confirm`;
      const header = this.generateHeader("POST", uri, queryContent);

      const resp = await fetch(BASE_URL + uri, {
        method: "POST",
        body: JSON.stringify(queryContent),
        headers: header,
      });

      return await resp.json();
    } catch (error) {
      console.error(error);
    }
  }

  async capture(queryContent, transactionId) {
    try {
      const uri = `/v3/payments/authorizations/${transactionId}/capture`;
      const header = this.generateHeader("POST", uri, queryContent);

      const resp = await fetch(BASE_URL + uri, {
        method: "POST",
        body: JSON.stringify(queryContent),
        headers: header,
      });

      return await resp.json();
    } catch (error) {
      console.error(error);
    }
  }

  async void(queryContent, transactionId) {
    try {
      const uri = `/v3/payments/authorizations/${transactionId}/void`;
      const header = this.generateHeader("POST", uri, queryContent);

      const resp = await fetch(BASE_URL + uri, {
        method: "POST",
        body: JSON.stringify(queryContent),
        headers: header,
      });

      return await resp.json();
    } catch (error) {
      console.error(error);
    }
  }

  async refund(queryContent, transactionId) {
    try {
      const uri = `/v3/payments/${transactionId}/refund`;
      const header = this.generateHeader("POST", uri, queryContent);

      const resp = await fetch(BASE_URL + uri, {
        method: "POST",
        body: JSON.stringify(queryContent),
        headers: header,
      });

      return await resp.json();
    } catch (error) {
      console.error(error);
    }
  }
}

export default LinePay;
