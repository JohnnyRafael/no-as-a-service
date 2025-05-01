# ❌ No-as-a-Service

<p align="center">
  <img src="https://raw.githubusercontent.com/hotheadhacker/no-as-a-service/main/assets/imgs/image.png" width="800" alt="No-as-a-Service Banner"/>
</p>


Ever needed a graceful way to say “no”?  
This tiny API returns random, generic, creative, and sometimes hilarious rejection reasons — perfectly suited for any scenario: personal, professional, student life, dev life, or just because.

Built for humans, excuses, and humor.

---

## 🚀 API Usage

**Base URL**
```
https://noreason.me/
```

**Method:** `GET`  
**Rate Limit:** `10 requests per minute per IP`

### 🔄 Example Request
```http
GET https://noreason.me/no
```

### ✅ Example Response
```json
{
"reasons": [
"I appreciate the thought, but it’s not the right fit for me right now.",
"At this point, I don’t have the bandwidth to do this justice.",
"Saying no to this helps me say yes to something that matters more to me.",
"This one doesn’t feel quite right, so I’ll have to pass."
]
}
```

Use it in apps, bots, landing pages, Slack integrations, rejection letters, or wherever you need a polite (or witty) no.

---

## 🛠️ Self-Hosting

Want to run it yourself? It’s lightweight and simple.

### 1. Clone this repository
```bash
git clone https://github.com/JohnnyRafael/no-as-a-service.git
cd no-as-a-service
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the server
```bash
npm start
```

The API will be live at:
```
http://localhost:3000/no
```

You can also change the port using an environment variable:
```bash
PORT=5000 npm start
```


---

## 🙏 Acknowledgements

The original project was created by [hotheadhacker](https://github.com/hotheadhacker/no-as-a-service), which provided the foundation for this tool.


---

## 📄 License

MIT — do whatever, just don’t say yes when you should say no.
