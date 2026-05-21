<div align="center">

# CareerForgeAI

### AI-Powered Career Growth Platform

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![LangChain](https://img.shields.io/badge/LangChain-000000?style=for-the-badge&logo=chainlink&logoColor=white)](https://langchain.com/)
[![PostgreSQL](https://img.shields.io/badge/NeonDB-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter_AI-6366F1?style=for-the-badge&logo=openai&logoColor=white)](https://openrouter.ai/)
[![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://career-forge-ai-one.vercel.app/)

<br/>

**[🔗 Live Demo](https://career-forge-ai-one.vercel.app/) · [📂 Repository](https://github.com/Piyushratn/CareerForgeAI) · [🐛 Report Bug](https://github.com/Piyushratn/CareerForgeAI/issues) · [✨ Request Feature](https://github.com/Piyushratn/CareerForgeAI/issues)**

</div>

---

## 📌 The Problem

> Job seekers spend 50+ hours preparing for interviews, still get rejected because their resumes don't pass ATS filters, and have no personalized guidance on what skills they actually need to develop for their target role.

**CareerForgeAI solves all three** — one platform that handles resume building, interview preparation, and career roadmapping using real AI, not templates.

---

## 📊 Impact

<div align="center">

| 🌐 Industries Supported | 🧠 Interview Questions | ⚡ Prep Time Reduced | 📄 Shortlist Rate Increase | 🚀 Users Helped |
|:---:|:---:|:---:|:---:|:---:|
| **50+** | **1000+** | **60%** | **40%** | **Growing** |

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Interview System** | 1000+ questions across 50+ industries with real-time AI feedback |
| 📄 **ATS Resume Builder** | AI generates ATS-optimized resumes tailored to job descriptions |
| ✉️ **Cover Letter Generator** | LangChain-powered cover letters customized per role |
| 🧠 **Skill Gap Analysis** | AI identifies missing skills and creates a learning plan |
| 🗺️ **Career Roadmap** | Personalized step-by-step roadmap from current role to target role |
| 📊 **Performance Dashboard** | Track interview scores, progress, and improvement over time |
| ⚡ **Background Jobs** | Inngest handles async AI tasks — no timeouts, no blocking |

---

## 🖼️ Screenshots

> **Dashboard — Career Overview**

![Dashboard](./screenshot1.png)

> *(Add more screenshots: interview mode, resume builder, roadmap view)*

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                            │
│              Next.js App Router + Tailwind CSS                   │
│   [ Dashboard ] [ Interview ] [ Resume ] [ Roadmap ] [ Skills ]  │
└────────────────────────┬────────────────────────────────────────┘
                         │ User Actions
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS API ROUTES                            │
│         /api/interview  /api/resume  /api/roadmap               │
└──────────┬──────────────────────────────────┬───────────────────┘
           │                                  │
           ▼                                  ▼
┌──────────────────────┐          ┌───────────────────────────────┐
│   INNGEST WORKERS    │          │        LANGCHAIN PIPELINE      │
│  Async background    │          │  • Prompt Engineering          │
│  job processing      │          │  • RAG-based context retrieval │
│  No API timeouts     │          │  • Skill gap analysis logic    │
│  Event-driven        │          │  • Resume content generation   │
└──────────┬───────────┘          └──────────────┬────────────────┘
           │                                     │
           └──────────────┬──────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    OPENROUTER API (LLM)                          │
│         Routes to best available AI model dynamically           │
│      Interview Q&A · Resume Writing · Roadmap Generation        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│               DATABASE LAYER (NeonDB + Prisma ORM)              │
│     Users · Resumes · Interview Sessions · Progress Data        │
│          PostgreSQL on Neon — serverless, scalable              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![ShadcnUI](https://img.shields.io/badge/Shadcn_UI-000000?style=flat-square&logo=shadcnui&logoColor=white)

### Backend
![Next.js API](https://img.shields.io/badge/Next.js_API_Routes-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Inngest](https://img.shields.io/badge/Inngest_Workers-6366F1?style=flat-square&logo=temporal&logoColor=white)

### Database
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![NeonDB](https://img.shields.io/badge/NeonDB_Serverless-00E699?style=flat-square&logo=neon&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma_ORM-3982CE?style=flat-square&logo=prisma&logoColor=white)

### AI / GenAI
![LangChain](https://img.shields.io/badge/LangChain-000000?style=flat-square&logo=chainlink&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter_API-6366F1?style=flat-square&logo=openai&logoColor=white)
![RAG](https://img.shields.io/badge/RAG_Pipeline-FF6B6B?style=flat-square)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## 📁 Project Structure

```
CareerForgeAI/
├── app/
│   ├── (main)/
│   │   ├── dashboard/         # Main user dashboard
│   │   ├── interview/         # AI interview system
│   │   ├── resume/            # ATS resume builder
│   │   └── roadmap/           # Career roadmap generator
│   ├── api/
│   │   ├── interview/         # Interview Q&A endpoints
│   │   ├── resume/            # Resume generation endpoints
│   │   └── roadmap/           # Roadmap generation endpoints
│   └── layout.js
├── actions/                   # Server actions
├── components/                # Reusable UI components
├── data/                      # Static data (industries, questions)
├── hooks/                     # Custom React hooks
├── lib/
│   ├── langchain.js           # LangChain pipeline setup
│   ├── prisma.js              # Prisma client
│   └── inngest.js             # Background job definitions
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── inngest.config.js          # Inngest worker config
├── next.config.mjs
└── package.json
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- NeonDB account (free) → [neon.tech](https://neon.tech)
- OpenRouter API key → [openrouter.ai](https://openrouter.ai)
- Inngest account (free) → [inngest.com](https://inngest.com)

### 1. Clone the repository

```bash
git clone https://github.com/Piyushratn/CareerForgeAI.git
cd CareerForgeAI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```env
# Database
DATABASE_URL=your_neondb_connection_string

# AI
OPENROUTER_API_KEY=your_openrouter_api_key

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Run Inngest dev server (separate terminal)

```bash
npx inngest-cli@latest dev
```

---

## 🎯 How to Use

**Step 1 — Set up your profile**
Enter your current role, target role, years of experience, and industry.

**Step 2 — Get your Career Roadmap**
AI generates a personalized step-by-step path from where you are to where you want to be.

**Step 3 — Practice Interviews**
Choose your industry and role → AI asks questions → get real-time feedback on your answers.

**Step 4 — Build your Resume**
Enter your details → AI generates an ATS-optimized resume tailored to your target job description.

**Step 5 — Generate Cover Letter**
Select a job posting → AI writes a customized cover letter in seconds.

**Step 6 — Track Progress**
Dashboard shows your interview scores, skill gaps closed, and improvement over time.

---

## 🔐 Security

- All API keys stored as environment variables — never hardcoded
- `.env` excluded via `.gitignore`
- Prisma ORM prevents SQL injection by design
- Inngest event signing key validates webhook authenticity

---

## 🚀 Key Engineering Highlights

- **Inngest for async AI jobs** — long-running LangChain tasks run as background jobs, preventing Vercel's 10-second timeout limit from killing AI responses
- **Prisma + NeonDB** — type-safe database queries with a serverless PostgreSQL backend that scales to zero when idle
- **RAG-powered skill gap analysis** — user profile data is used as retrieval context, making roadmaps specific to the individual rather than generic
- **Prompt engineering per feature** — each feature (interview, resume, roadmap) uses a separately tuned system prompt for maximum output quality

---

## 🗺️ Roadmap

- [ ] LinkedIn profile import for auto-filling resume data
- [ ] Mock interview with voice input (speech-to-text)
- [ ] Job board integration — match resumes to real job listings
- [ ] Team/enterprise plan — HR teams can assess candidates
- [ ] Mobile app (React Native)

---

## 👨‍💻 Author

**Piyush Ratn** — AI-Focused Full-Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/piyush-ratn)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Piyushratn)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:piyushratn932@gmail.com)
[![Portfolio](https://img.shields.io/badge/More_Projects-000000?style=flat-square&logo=vercel&logoColor=white)](https://github.com/Piyushratn)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

⭐ **If CareerForgeAI helped you, consider giving it a star!** ⭐

*Built with ❤️ by [Piyush Ratn](https://github.com/Piyushratn)*

</div>
