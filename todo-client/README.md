# Todo Application

This is a full-stack todo application built with React and Node.js, featuring user authentication and CRUD operations for todo items.

## Project Structure

- `src/` - Frontend React application
- `todoApp/` - Backend Node.js server
  - REST API endpoints for todos and authentication
  - MongoDB integration for data persistence
  - JWT-based authentication

## Getting Started

### Prerequisites

- Node.js
- MongoDB running locally
- npm or yarn

### Running the Application

1. **Start the Backend Server**
```bash
node todoApp/run-server.js
```
The backend server will run on http://localhost:3000

2. **Start the Frontend Development Server**
```bash
PORT=3001 npm start
```
The React application will run on http://localhost:3001

## Features

- User Authentication (Login/Logout)
- Todo Management:
  - Create new todos
  - List all todos
  - Toggle todo completion status
  - Delete todos

## Recent Updates

- Fixed todo deletion functionality by properly handling MongoDB ID transformation
- Updated ID references in frontend to match backend's JSON transformation (`_id` → `id`)
- Backend now running on port 3000, frontend on port 3001 to avoid conflicts

## Available Scripts

### Frontend Scripts

#### `npm start`

Runs the React app in development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### Backend Scripts

#### `node todoApp/run-server.js`

Starts the backend server with:
- MongoDB connection
- REST API endpoints
- Authentication middleware
- Todo CRUD operations

## Technology Stack

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Learn More

For more information about Create React App, check the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
