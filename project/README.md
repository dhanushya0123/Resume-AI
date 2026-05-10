# 🎯 ResumeIQ — AI Resume Screening Application

A full-stack application that uses OpenAI to compare resumes against job descriptions and instantly generate a detailed fit analysis.

---

## ✨ Features

| Feature | Detail |
|---|---|
| **File Upload** | Drag-and-drop or click to upload PDF, DOC, DOCX (max 5 MB) |
| **AI Analysis** | GPT-4o mini compares resume text with the job description |
| **Match Score** | 0–100% circular gauge with colour-coded rating |
| **Skills Found** | List of JD requirements present in the resume |
| **Missing Skills** | List of JD requirements absent from the resume |
| **Candidate Summary** | 2–4 sentence AI-written overview of the candidate |
| **Error Handling** | Validation on both client and server; user-friendly messages |
| **Responsive UI** | Works on mobile, tablet, and desktop |

---

## 🗂 Folder Structure

```
project/
├── client/                        # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DropZone.jsx       # Drag-and-drop file upload
│   │   │   ├── ErrorMessage.jsx   # Error alert banner
│   │   │   ├── ResultsDashboard.jsx # Full results panel
│   │   │   ├── ScoreGauge.jsx     # Circular match-% gauge
│   │   │   ├── SkillTag.jsx       # Pill badge for a skill
│   │   │   └── Spinner.jsx        # Animated loading spinner
│   │   ├── pages/
│   │   │   └── Home.jsx           # Main page
│   │   ├── services/
│   │   │   └── api.js             # Axios API client
│   │   ├── App.js
│   │   └── index.css              # Tailwind directives + custom styles
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── server/                        # Express backend
    ├── controllers/
    │   └── resumeController.js    # Business logic for /analyze
    ├── middleware/
    │   ├── errorHandler.js        # Central error handler
    │   └── upload.js              # Multer config
    ├── routes/
    │   └── resumeRoutes.js        # POST /api/resume/analyze
    ├── uploads/                   # Temp storage (auto-cleaned)
    ├── utils/
    │   ├── openaiService.js       # OpenAI API integration
    │   └── resumeParser.js        # PDF + DOCX text extraction
    ├── .env.example
    ├── package.json
    └── server.js                  # Express entry point
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9
- An [OpenAI API key](https://platform.openai.com/api-keys)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/resumeiq.git
cd resumeiq
```

---

### 2. Set up the server

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:
```env
OPENAI_API_KEY=sk-your-real-openai-key
PORT=5000
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

Start the server:
```bash
npm run dev          # hot-reload with nodemon
# or
npm start            # production
```

Server runs at → **http://localhost:5000**

---

### 3. Set up the client

```bash
cd ../client
npm install
npm start
```

Client runs at → **http://localhost:3000**

> The `"proxy": "http://localhost:5000"` in `client/package.json` forwards API calls so no CORS issues in development.

---

## 🔌 API Reference

### `POST /api/resume/analyze`

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `resume` | File | ✅ | PDF, DOC, or DOCX, max 5 MB |
| `jobDescription` | String | ✅ | Full job description text (min 20 chars) |

**Success response (200):**
```json
{
  "success": true,
  "fileName": "john_doe_resume.pdf",
  "matchPercentage": 82,
  "skillsFound": ["React", "TypeScript", "Node.js", "REST APIs"],
  "missingSkills": ["GraphQL", "Docker"],
  "summary": "John has 5 years of full-stack experience strongly aligned with this role. His React and Node.js background is an excellent match. Exposure to GraphQL and container tooling would round out his profile."
}
```

**Error response:**
```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

---

### `GET /api/health`

Returns `{ "status": "OK" }` — useful for uptime monitoring.

---

## 🧪 API Testing (curl)

```bash
# Health check
curl http://localhost:5000/api/health

# Analyse a resume
curl -X POST http://localhost:5000/api/resume/analyze \
  -F "resume=@/path/to/resume.pdf" \
  -F "jobDescription=We are looking for a Senior React Developer with 5+ years of experience in TypeScript, Node.js, REST APIs, and cloud deployment."
```

---

## 🌐 Deployment

### Backend → [Render](https://render.com)

1. Push your project to GitHub.
2. Go to Render → **New Web Service** → connect your repo.
3. Set **Root Directory** to `server`.
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. Add environment variables in Render dashboard:
   - `OPENAI_API_KEY`
   - `CLIENT_URL` → your Vercel frontend URL
   - `NODE_ENV=production`

---

### Frontend → [Vercel](https://vercel.com)

1. Go to Vercel → **New Project** → import your repo.
2. Set **Root Directory** to `client`.
3. **Build Command:** `npm run build`
4. **Output Directory:** `build`
5. Add environment variable:
   - `REACT_APP_API_URL` → your Render backend URL (e.g. `https://resumeiq-api.onrender.com`)

---

## 🔧 Environment Variables

### Server (`server/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `OPENAI_API_KEY` | ✅ | — | Your OpenAI secret key |
| `PORT` | ❌ | `5000` | Server port |
| `CLIENT_URL` | ❌ | `http://localhost:3000` | Allowed CORS origin |
| `NODE_ENV` | ❌ | `development` | `development` or `production` |

### Client (`client/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `REACT_APP_API_URL` | ❌ | `http://localhost:5000` | Backend API base URL |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Tailwind CSS, Axios |
| Backend | Node.js, Express 4 |
| AI | OpenAI GPT-4o mini (`chat.completions`) |
| File Upload | Multer |
| PDF Parsing | pdf-parse |
| DOCX Parsing | mammoth |
| Dev Server | nodemon |

---

## 📝 License

MIT — free for personal and commercial use.
