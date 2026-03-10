# 🧠 AI Market Intelligence War Room

A modern AI-powered SaaS dashboard that helps small business owners analyze competitor pricing and generate data-driven marketing strategies using a multi-agent AI system.

![AI Market Intelligence War Room](https://img.shields.io/badge/AI-Market%20Intelligence-6366f1?style=for-the-badge&logo=openai&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🚀 Features

- **Dark Glassmorphism UI** — Startup-style dashboard with modern aesthetics
- **Multi-Agent AI Workflow** — Simulated Scout → Analyst → Strategist agent pipeline
- **Competitor Price Trend Chart** — Real-time Chart.js line graph comparing your price vs competitor
- **Live AI Agent Activity Logs** — Animated terminal-style log feed
- **AI Strategy Output Panel** — Structured 7-section strategy rendered from webhook response
- **n8n Webhook Integration** — Full POST integration with structured JSON payload

---

## 📸 Dashboard Sections

| Section | Description |
|---|---|
| 💰 Pricing Strategy | AI-generated tiered pricing recommendation |
| 📣 Marketing Strategy | Demand generation and content marketing approach |
| 🚀 Growth Tactics | Viral and referral-based growth ideas |
| 🎯 Competitive Positioning | How to position against competitors |
| 📡 Customer Acquisition Channels | Where and how to find customers |
| ✨ Product Differentiation | Unique selling points and features |
| 🗺️ Execution Roadmap | Phase-by-phase go-to-market plan |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Glassmorphism, animations, responsive grid
- **Vanilla JavaScript** — Form handling, Fetch API, DOM rendering
- **[Chart.js](https://www.chartjs.org/)** — Competitor price trend visualization
- **[n8n](https://n8n.io/)** — Backend AI multi-agent workflow via webhook

---

## ⚡ Getting Started

### Option 1: Open directly
Just open `index.html` in any modern browser.

### Option 2: Run with a local server (recommended)
```bash
# Python
python -m http.server 8000

# Or Node.js
npx http-server
```

Then visit: [http://localhost:8000](http://localhost:8000)

---

## 📡 Webhook API

When you click **"Analyze Market Strategy"**, the app sends a `POST` request to your n8n webhook:

```
POST https://harishwa.app.n8n.cloud/webhook/upload
Content-Type: application/json
```

**Payload:**
```json
{
  "business": "Business Name",
  "product": "Product / Service",
  "price": "Current Price",
  "competitor": "Competitor Name",
  "target": "Target Audience",
  "platform": "Marketing Platform",
  "description": "Product Description"
}
```

**Expected Response:**
```json
{
  "output": {
    "pricing_strategy": "...",
    "marketing_strategy": "...",
    "growth_tactics": ["...", "..."],
    "competitive_positioning": "...",
    "customer_acquisition_channels": ["...", "..."],
    "product_differentiation": "...",
    "execution_roadmap": ["...", "..."]
  }
}
```

---

## 📁 Project Structure

```
ai_market_intel/
├── index.html      # App structure & layout
├── style.css       # Dark theme, glassmorphism styles
├── script.js       # Chart.js, agent logs, webhook integration
└── README.md       # You are here
```

---

## 🤖 AI Agent Workflow

```
User Input ──► Scout Agent ──► Analyst Agent ──► Strategist Agent ──► Output
                 │                  │                    │
           Scans competitor    Evaluates pricing    Generates full
           website/data        gaps & audience      marketing plan
```

---

## 📄 License

MIT License — feel free to fork and customize for your own use.
