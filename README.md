# HRMS Lite - Frontend UI
 
##  Project Overview
HRMS Lite Frontend is a modern, responsive Single Page Application (SPA) built with **React** and **Vite**. It provides a professional, enterprise-grade interface for HR administrators to manage employees and track daily attendance efficiently.
 
##  Key Features
- **Dashboard**: Real-time overview of total employees, departments, and daily attendance statistics.
- **Employee Management**:
  - Add, Edit, and Delete employee records.
  - Search/Filter employees by ID or Name.
  - Auto-generated avatars based on initials.
- **Attendance Tracking**:
  - Dedicated attendance marking interface.
  - Historical view with Date and Employee filters.
  - Visual status badges (Present/Absent).
- **Responsive Design**: Fully responsive layout optimized for desktop and tablet usage.
- **Enterprise UI**: Custom CSS design system using an "Enterprise Dark/Slate" theme.
 
##  Tech Stack
- **Core**: React 18, Vite
- **Styling**: Vanilla CSS (CSS Modules approach with global variables)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios
- **Routing**: React Router DOM
 
##  Project Structure
```
hrms_frontend/
├── src/
│   ├── components/     # Reusable UI components (Navbar, etc.)
│   ├── pages/          # Main route pages (Employees.jsx, Attendance.jsx)
│   ├── api.js          # Axios configuration
│   ├── App.jsx         # Main application entry
│   └── index.css       # Global design system & styles
├── public/             # Static assets
├── Dockerfile          # Multi-stage build configuration
├── nginx.conf          # Nginx config for Docker serving
└── package.json        # Dependencies and scripts
```
 
##  Setup & Installation
 
### Prerequisites
- Node.js 16+
- npm or yarn
 
### 1. Navigate to Directory
```bash
cd hrms_frontend
```
 
### 2. Install Dependencies
```bash
npm install
```
 
### 3. Environment Configuration
Create a `.env` file in the root if you need to point to a custom backend URL (Default is localhost:8000):
```env
VITE_API_URL= https://ethara-ai-backend-production.up.railway.app/api
```
 
### 4. Run Development Server
```bash
npm run dev
```
The application will be accessible at `https://etharaaihrms.netlify.app/`.
 
## Docker Deployment
The frontend uses a multi-stage Docker build to compile the React app and serve it via Nginx.
 
```bash
docker build -t hrms-frontend .
docker run -p 3000:80 hrms-frontend
```
 
##  Design System
The project uses a centralized CSS variable system defined in `index.css`:
- **Typography**: Inter (Google Fonts)
- **Colors**: Slate (Primary), Blue (Accent), Red/Green (Status)
- **Components**: Glassmorphism effects, sticky headers, and data-dense tables.
