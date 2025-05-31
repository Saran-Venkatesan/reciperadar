## 📦 MongoDB Setup & Configuration
This project uses **MongoDB** as the primary database. Follow the steps below to set up MongoDB and connect it to the project.

### 1. Install MongoDB
Make sure MongoDB is installed on your system or set up a cloud instance using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Local Installation Guide:**  
  https://docs.mongodb.com/manual/installation/

### 2. Create a Database
Create a new database (e.g., `recipeRadar`) and required collections (e.g., `users`, `recipes`, etc.) using MongoDB Compass or via the terminal.

### 3. Set Up Environment Variables
Create a `.env` file in the root of your backend project and add your MongoDB connection string:
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/dbname?retryWrites=true&w=majority
Replace username and password with actual credentials of users.

Add a JWT_SECRET key.

