# Project Management Panel
<img width="1842" height="1033" alt="screen" src="https://github.com/user-attachments/assets/09783eca-a666-41d1-9907-51e6ac604022" />

A modern web application for tracking and managing projects, including their names, start and end dates, and statuses (**Completed**, **In Progress**, **To Do**). The dashboard provides a visual summary and interactive table for efficient project management.

---

## ✨ Features
- 📊 Dashboard with pie chart and status cards for project overview  
- 📋 Project list with sorting, filtering, pagination, and CRUD operations  
- 📝 Modal dialogs for creating and editing projects  
- ⚡ Real-time updates using React Query  
- 🌐 Backend API built with Express and MongoDB  
- 🎨 Responsive and clean UI with Material-UI (MUI)  
- ✅ Error handling and user notifications  

---

## 🛠️ Technologies Used

### Frontend
- **React** (functional components and hooks)  
- **Material-UI (MUI)** for UI components  
- **Recharts** for data visualization (pie chart)  
- **@tanstack/react-query** for data fetching and caching  
- **Axios** for HTTP requests  

### Backend
- **Node.js** with **Express** for REST API  
- **MongoDB** for data storage  
- **CORS** for cross-origin requests  

### Testing & Tooling
- **Jest** and **@testing-library/react** for unit testing  
- **Babel** for JavaScript transpilation  

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or newer is recommended)  
- **MongoDB** (local or remote instance)  

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/KBatuhanB/Project-Management-Panel.git
    cd Project-Management-Panel
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    node src/backend/server.js
    ```
    The API will be available at:  
    ```text
    http://localhost:5000
    ```

4. Start the frontend application:
    ```bash
    npm start
    ```
    The app will be available at:  
    ```text
    http://localhost:3000
    ```

---

## ⚙️ Configuration
The backend connects to MongoDB at:  
```text
mongodb://localhost:27017/Projeler
