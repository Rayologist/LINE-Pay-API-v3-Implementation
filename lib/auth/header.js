class LinePayHeader {
    constructor(channelId, hmacSignature, nonce) {
      this.channelId = channelId;
      this.hmacSignature = hmacSignature;
      this.nonce = nonce;
    }
  
    generate() {
      return {
        "Content-Type": "application/json",
        "X-LINE-ChannelId": this.channelId,
        "X-LINE-Authorization-Nonce": this.nonce,
        "X-LINE-Authorization": this.hmacSignature,
      };
    }
  }
  
  export default LinePayHeader;
  