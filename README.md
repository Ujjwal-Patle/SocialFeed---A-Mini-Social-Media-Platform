# 🌐 SocialFeed - Mini Social Media Platform

SocialFeed is a full-stack social media web application that allows users to register, create short posts, like and comment on others' posts and interact with a chatbot. It’s built with Spring Boot (Java) for the backend and React (Vite + Bootstrap) for the frontend, using MySQL for structured data and token-based authentication using JWT.

---

## 🚀 Tech Stack

### 🔧 Backend
- Java 21
- Spring Boot
- Spring Security (JWT Authentication)
- Spring Data JPA (Hibernate)
- MySQL (Relational Database)
- Lombok
- ModelMapper

### 🎨 Frontend
- React.js (with Vite)
- React Bootstrap
- Axios

---

## 🔑 Key Features

- 👤 User Registration & Login (JWT-secured)
- 📝 Post Creation, Editing, Deletion
- ❤️ Like & 💬 Comment on posts
- 🔍 View other users’ feeds
- 🤖 Integrated ChatBot
- 📂 File uploads (profile picture, post image)
- 🛡️ Secure API endpoints with token-based protection
- 📱 Fully responsive UI

---

## 🗂️ Folder Structure
```bash
socialfeed/
├── backend/
│ └── src/main/java/com/socialfeed/
│ ├── config/
│ ├── controller/
│ ├── dto/
│ ├── entity/
│ ├── repository/
│ ├── service/
│ └── SocialFeedApplication.java
├── frontend/
│ └── src/
│ ├── components/
│ ├── services/
│ ├── pages/
│ └── App.jsx
```
---

## ⚙️ Setup Instructions

### 📌 Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
  ```bash
    application.properties
    spring.datasource.url=jdbc:mysql://localhost:3306/socialfeed
    spring.datasource.username=your_mysql_username
    spring.datasource.password=your_mysql_password
    spring.jpa.hibernate.ddl-auto=update

    jwt.secret=your_jwt_secret
  ```
### Run the backend server:
  ./mvnw spring-boot:run
---
## Frontend Setup (React.js)

### Navigate to the frontend directory:
cd frontend

### Install dependencies:
npm install


### Start the development server:
npm run dev

---
## 📸 Screenshots

![image](https://github.com/user-attachments/assets/3684f701-26aa-46a3-a3ca-0c089fda37fb)

![image](https://github.com/user-attachments/assets/61025ca5-de06-4f0b-b545-e414730d66fe)

![image](https://github.com/user-attachments/assets/ab775b07-4138-4497-98b5-f22c0960f8f0)

![image](https://github.com/user-attachments/assets/401a9b8d-0090-4484-8a26-fd389fb39cdd)

![image](https://github.com/user-attachments/assets/a915d95e-0689-4666-9f1f-bddbeed06e39)

## 👨‍💻 Author
Ujjwal Patle


## 🛡️ License
This project is for industry use.


