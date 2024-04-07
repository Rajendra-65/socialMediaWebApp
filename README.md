Snapgram
Snapgram is a social media web platform application that allows users to share posts, interact with other users through likes, saves, comments, and real-time notifications, and manage their profiles.

Features

Post Updates: Users can create, edit, and delete posts with images and text content.
Profile Management: Users can edit their profile information, including username, bio, and profile picture.
Like and Save: Users can like and save posts to their profile for later viewing.
Real-time Notifications: Users receive real-time notifications for activities such as, notificatiion , and chat messages.
Chat Updates: Users can engage in real-time chat conversations with other users.
Search: Users can search for other users and posts using keywords.
Technologies Used
Snapgram utilizes the following technologies and packages:

Frontend:

React.js
Next.js
Tailwind CSS
React Toastify for handling success and error messages
Tailwind Merge for tailwindcss utilities
Tailwind CSS Animate for animations
Next Themes for theme management
Axios for making HTTP requests
Lucide React for iconography
React Hook Form for form handling and validation
Use Debounce for debouncing input events
Backend:

MongoDB with Mongoose for data storage
JWT (JSON Web Tokens) for user authentication and authorization
bcryptjs for password hashing
Pusher for real-time chat updates
AWS4 for AWS API authentication
Class Variance Authority for class variance management
Date-fns for date manipulation
JSON Web Token decoding library for decoding JWT tokens
Other:

Cloudinary for image storage and manipulation
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/snapgram.git
Install dependencies:

bash
Copy code
cd snapgram
npm install
Configure environment variables:

Create a .env file in the root directory and add the following variables:

env
Copy code
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_pusher_cluster
Start the development server:

bash
Copy code
npm run dev
