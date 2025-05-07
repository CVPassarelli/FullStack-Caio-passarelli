# 🧩 Fullstack Task Manager

A fullstack task manager built with:

- ⚙️ **Backend**: Node.js + Express + Prisma + WebSocket  
- 🎨 **Frontend**: React + React Hook Form + Zod  
- 🗃️ **Database**: PostgreSQL  
- 🐳 **Containerized** with Docker  

---

## 🚀 Getting Started

### 🧪 Requirements

- Node.js 20+
- PNPM
- Docker & Docker Compose

---

## 📦 Project Structure

```
apps/
├── backend/           # Node.js + Express + Prisma
├── frontend/          # React + Tailwind + Hook Form
├── interfaces/        # Shared TypeScript interfaces and Zod schemas
└── docker-compose.yml
```

---

## 🌱 Environment Variables

### Backend (.env)

```
PORT=3001
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb"
```

---

## 🧭 Running the Project

### ▶️ With Docker (Recommended)

```bash
# Navigate to root of apps
cd apps

# Build and run
docker-compose up --build
```

- Frontend: http://localhost:3000  
- Backend API: http://localhost:3001/api  
- WebSocket: ws://localhost:3001  

---

### 💻 Without Docker (Manual)

#### 1. Start PostgreSQL (e.g., with Docker or local install)

```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mydb -p 5432:5432 postgres:15
```

#### 2. Setup Backend

```bash
cd apps/backend
pnpm install
cp .env.example .env # or create manually
pnpm prisma generate
pnpm dev
```

#### 3. Setup Frontend

```bash
cd apps/frontend
pnpm install
pnpm start
```

---

## 🔌 API Documentation

### POST `/api/task`

**Request body:**

```json
{
  "title": "Create layout",
  "description": "Build homepage layout",
  "assigne": "Alice",
  "completed": false
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Create layout",
  "description": "Build homepage layout",
  "assigne": "Alice",
  "completed": false
}
```

### GET `/api/task`

Returns all tasks.

---

## 🏗️ Architecture Notes

- All shared types and validation schemas live in `apps/interfaces`
- Backend and frontend both import types from this shared folder
- WebSocket is used for **real-time updates** across clients
- Optimistic UI updates are handled on the frontend
- Prisma handles DB access; Zod handles input validation

---

## 🔠 Types & Schemas

All domain types are centralized in:

```
apps/interfaces/
├── task.ts          # ITask, IUser interfaces
└── schema/
    └── task.schema.ts # Zod validation schema for task forms
```

---

## ✅ Tests

```bash
pnpm test
```

Tests are written using:

- `@testing-library/react`
- `jest`
- `msw` (optional for mocking APIs)

---

## 📋 License

MIT