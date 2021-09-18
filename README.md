# LINE Pay API v3 Implementation

This package implements LINE Pay API v3 in Node.js.

Packages Used:
* `uuid`
* `node-fetch`
* `dotenv`

# Usage

## 1. Download the package

```bash
npm i line-pay-api-v3
```

## 2. Create a .env file

```env
CHANNEL_ID=your_channel_id
SECRET_KEY=your_secret_key
```

## 3. Code Example

### 1. Instantiate LinePay class

> Set `isProduction` to `false` for using LINE Pay Sandbox

```node
import LinePay from "line-pay-api-v3";
import { config } from "dotenv";

config();

const linePay = new LinePay({
  channelId: process.env.CHANNEL_ID,
  secretKey: process.env.SECRET_KEY,
  isProduction: false,
});

```
### 2. Merchandise Infomation Example

```node
const merch = {
  amount: 121200,
  currency: "TWD",
  orderId: "202109181134_b4d5a496-60aa-4c77-a250-7f5b971f688b",
  packages: [
    {
      id: "1",
      amount: 121200,
      products: [
        {
          id: "A2638",
          name: "iPhone 13 Pro Max 256 GB",
          imageUrl:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pro-max-gold-select?wid=470&hei=556&fmt=png-alpha&.v=1631652956000",
          quantity: 3,
          price: 40400,
        },
      ],
    },
  ],
  redirectUrls: {
    confirmUrl: "https://www.apple.com/tw/shop/buy-iphone/iphone-13-pro",
    cancelUrl: "https://www.apple.com/tw/iphone-13-pro/",
  },
};

```

### 3. Await response

```node
const resp = await linePay.request(merch);
console.log(resp);
```

### 4. Results

```node
{
  returnCode: '0000',
  returnMessage: 'Success.',
  info: {
    paymentUrl: {
      web: 'https://sandbox-web-pay.line.me/web/payment/wait?transactionReserveId=SWFvMDFnaFJwYkY0djY5b1VIUWEvK1g4OU5FVUdzVHg3cGFqS2JBNkEwOHNGMzY5OU9Qc3hnSmVsaGNES0QyVg',
      app: 'line://pay/payment/SWFvMDFnaFJwYkY0djY5b1VIUWEvK1g4OU5FVUdzVHg3cGFqS2JBNkEwOHNGMzY5OU9Qc3hnSmVsaGNES0QyVg'
    },
    transactionId: 2021091900690059800,
    paymentAccessToken: '407765261711'
  }
}

```

## 4. Resources

- [LINE Pay API v3 Documentation](https://pay.line.me/jp/developers/apis/onlineApis?locale=en_US)

