# 🏠 Rental.co – Room Rental Platform

A full-stack web application where users can explore, like, and book rental rooms easily.

---

## 🚀 Features

- 🔍 Search rooms by location
- ❤️ Like / Unlike rooms
- 🏠 Add new rooms with images
- 📸 Image upload support (multiple images)
- 📄 Detailed room view
- 📌 Booking system (availability updates)
- 🔐 User authentication
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

### Frontend

- React.js
- CSS
- React Router
- Material UI Icons

### Backend

- Node.js
- Express.js

### Database

- MongoDB (MongoDB Atlas)

---

## 📂 Project Structure

/frontend
/backend

## 👩‍💻 Author

**Alka Tripathi**  
BTech CSE | Full Stack Developer

## 💡 Future Improvements

- 💳 Online payment integration
- 🧾 Booking history
- 🔔 Notifications system
- 📊 Admin dashboard

---

## ⭐ Show your support

If you like this project, give it a ⭐ on GitHub!

## All API

- Authentication API

1. auth/login
2. auth/signup
3. auth/logout

- Rooms API

1. room/getrooms
2. room/liked_rooms
3. room/booked_rooms
4. room/:id
5. room/like/:roomId
6. room/unlike/:roomId
7. room/book/:id
8. /room/unbook/:id

## FLOW OF YOUR AUTHENTICATION SYSTEM

Frontend Login Request
       ↓
AuthRouter.js
       ↓
AuthController.js → login()
       ↓
Check Email & Password
       ↓
Generate JWT Token
       ↓
Store Token in Cookie
       ↓
Browser Saves Cookie
       ↓
Future Requests Automatically Send Cookie
       ↓
Backend Verifies JWT
