# MERN Forum Project

## Project Overview
The **MERN Forum Project** is an online platform for engaging discussions through posted messages. Built using the MERN stack, this forum includes features like user authentication, real-time updates, user dashboards, admin controls, and more. The project focuses on scalability, performance, and user-friendly design.

---

## Live Site
[Visit the Live Site](<https://mellow-mandazi-3e1f97.netlify.app/>)

---

## Git Repository

[Client Git](<https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-aaliahammedpriom>)
[Server Git](<https://github.com/Programming-Hero-Web-Course4/b10a12-server-side-aaliahammedpriom>)

---

## Key Features
### General
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices.
- **Search Functionality**: Tag-based search with results displayed dynamically.
- **Posts Management**: Users can create, view, sort, and interact with posts.
- **Upvote/Downvote System**: Tracks post popularity using votes.
- **Pagination**: Implemented for efficient content browsing.

### Authentication
- **Secure Login/Registration**: Includes social login and email/password-based registration.
- **JWT Authentication**: Secured routes with tokens.
- **Role-Based Access Control**: Differentiated access for Admin and regular users.

### User Features
- **Dashboard**:
  - View profile with badges.
  - Add and manage posts.
  - Membership functionality for additional privileges.
- **Post Interactions**:
  - Add comments.
  - Share posts via social platforms.

### Admin Features
- **Admin Dashboard**:
  - Manage users (search, assign admin roles).
  - Moderate reported comments. Delete post
  - Post announcements.
  - View analytics through a pie chart.

### Security
- **Environment Variables**: Secure Firebase and MongoDB credentials using `.env`.
- **Backend Validation**: Ensures data integrity.

---

## Technologies Used
- **Frontend**: React.js
  - State Management: React Context API
  - Styling: Tailwind CSS
  - Form Handling: react-hook-form
  - Social Sharing: react-share
  - Dropdowns: React-select
- **Backend**: Node.js, Express.js
  - Data Fetching: TanStack Query
  - JWT Authentication
  - MongoDB Aggregation for analytics and sorting
- **Database**: MongoDB
- **Hosting**:
  - Frontend: Netlify / Vercel
  - Backend: Render / Railway
- **Tools**:
  - Axios Interceptor
  - Firebase Authentication
  - MongoDB Atlas

---

## Installation and Setup
1. Clone the repositories:
   - Frontend: `git clone <Frontend_GitHub_Repo_URL>`
   - Backend: `git clone <Backend_GitHub_Repo_URL>`

2. **Backend Setup**:
   - Navigate to the backend folder: `cd backend`
   - Install dependencies: `npm install`
   - Create a `.env` file with the following:
     ```
     PORT=<Your_Port>
     MONGO_URI=<Your_MongoDB_URI>
     JWT_SECRET=<Your_JWT_Secret>
     FIREBASE_API_KEY=<Your_Firebase_API_Key>
     ```
   - Start the server: `npm start`

3. **Frontend Setup**:
   - Navigate to the frontend folder: `cd frontend`
   - Install dependencies: `npm install`
   - Create a `.env` file with:
     ```
     REACT_APP_FIREBASE_API_KEY=<Your_Firebase_API_Key>
     ```
   - Start the development server: `npm start`

---

## Usage
### Admin Access
- Email: `<priom66@gmail.com>`
- Password: `<priom66@gmail.comA>`

---

## Folder Structure

/src
├── components         # Reusable UI components
├── context            # Context API for global state
├── hooks              # Custom React hooks
├── layouts            # Main layout and dashboard layout components
├── pages              # Main application pages
│   ├── Home           # Homepage
│   ├── Join Us        # Login and signup pages
│   ├── My Profile     # User profile page
│   ├── My Posts       # Posts created by the user
│   ├── Add Post       # Form for creating a new post
│   ├── Comments       # Comments on posts
│   ├── Membership     # Membership-related pages
│   ├── Manage Users   # Admin user management
│   ├── Activities     # Admin activity logs
│   ├── Announcement   # Admin announcements form
│   ├── Shared         # Shared pages like error and loading
├── router             # React Router configuration
└── styles             # Global and component-specific styles



---

## Challenges and Solutions
1. **Role-Based Access Control**:
   - Implemented with middleware to secure admin routes.
2. **Pagination**:
   - Efficiently handled via MongoDB aggregation and React pagination components.
3. **Responsive Design**:
   - Utilized Tailwind CSS for consistent, responsive styling.

---

## Future Enhancements
- **Enhanced Comment Reporting**: Add detailed feedback analytics.
- **Real-Time Notifications**: Use WebSockets for instant updates.
- **Advanced Analytics**: Expand admin reporting capabilities.

---

## Credits
Developed by **A Ali Ahammed Priom**.  
[GitHub](https://github.com/aaliahammedpriom) | [LinkedIn](https://www.linkedin.com/in/a-ali-ahammed-priom/)

---

## Feedback
Feel free to share feedback or raise issues in the repository. Contributions are always welcome!

