# Geotagger Frontend

The Geotagger frontend is a React application that allows users to interact with the Image Guessing Game. Users can
upload images, tag locations on a map, and guess the locations of other uploaded images. The application communicates
with the backend API for user authentication, image management, and point tracking.

## Features

- **User Authentication**:
    - Login and registration via JWT authentication.
    - OAuth login using Google or Facebook.
    - Forgot password functionality with email-based token reset.

- **Image Upload and Location Tagging**:
    - Users can upload images and tag their geographical location on an interactive Google Map.
    - The location is stored with latitude and longitude coordinates in the database.
    - Images are displayed in a gallery.

- **Guessing Game**:
    - Registered users can try to guess the location of images by placing a pin on the map.
    - Points are deducted with each guessing attempt and adjusted based on the accuracy of the guess.
    - A distance error is shown, indicating how far the guess is from the real location.

- **Points System**:
    - Display the user's points balance and adjust it based on image uploads and guesses.
    - Points are awarded for uploading images and deducted with each guessing attempt.

- **Action Logging**:
    - Logs user interactions, including clicks, scrolls, and form inputs, to track activity.


## Technologies Used

- **Frontend Framework**: Next.js with TypeScript
- **UI Libraries**: Material UI (MUI)
- **Authentication**: JWT for session management, OAuth for Google/Facebook login
- **Map Integration**: Google Maps API for interactive map functionality
- **State Management**: Zustand for global state management
- **Virtualization**: Tanstack/react-virtual for efficient rendering of large lists
- **Data fetching**: Tanstack/react-query for data fetching and caching

## Prerequisites

- **Node.js** 20+
- **Google Maps API Key** (for map functionality)
- **Backend API** (ensure the backend API is running as per the backend `README.md`)

## Setup Instructions

### 1. Install Dependencies

In the frontend directory, run the following command to install all required dependencies:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following content:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_AUTH_URL=http://localhost:3000/api/auth
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
JWT_SECRET=
```

### 3. Run the Development Server

Start the frontend development server:

```bash
npm run start
```

The Next app will be running on [http://localhost:3000](http://localhost:3000).


### Admin Credentials

- **Email**: admin@admin.com
- **Password**: Admin123!




