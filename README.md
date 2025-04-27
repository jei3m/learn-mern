# Product Management Application

![Screenshot 2025-04-28 011531](https://github.com/user-attachments/assets/d21bb9ef-d051-4f4b-a89a-b74bee7e3935)
This is a full-stack product management application built while following the [MERN Stack Tutorial with Deployment](https://www.youtube.com/watch?v=O3BUHwfHf84&t=7549s) on YouTube.

## Features

- **Product Listing**: View all products in a responsive grid layout
- **Create Products**: Add new products with name, description, price and image
- **Edit Products**: Update existing product details
- **Delete Products**: Remove products from the system
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Changes are reflected immediately

## Technologies Used

- **Frontend**:
  - React.js with TypeScript
  - Vite.js for fast development
  - Chakra UI for styling and components
  - Zustand for state management
  - React Router for navigation

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB

## Installation

To set up the Product Management App locally, follow these steps:

1. **Clone the Repository**
    
    ```shell
    git clone https://github.com/jei3m/learn-mern.git
    cd learn-mern
    ```

2. **Install Dependencies**
    
    ```shell
    npm install
    cd frontend
    npm install
    ```

3. **Set Up Environment Variables**
    
    Create a `.env` file in the backend directory and add your MongoDB connection string:
    
    ```dotenv
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ORIGIN_URL=http://localhost:5173
    ```

4. **Start the Development Server**
    
    From the root directory:
    ```shell
    npm run start
    ```

5. **Open Your Browser**
    
    Navigate to `http://localhost:5000` to view the application.

## Usage

- **Viewing Products**: All products are displayed on the home page
- **Adding Products**: Click the "Create" button to add a new product
- **Editing Products**: Click the edit icon on any product card
- **Deleting Products**: Click the delete icon on any product card
