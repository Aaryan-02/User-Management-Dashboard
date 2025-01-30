# User Management Dashboard

A simple user management dashboard built with React and VITE, using the JSONPlaceholder API for mock backend functionality. The application allows users to perform CRUD operations (Create, Read, Update, Delete) on a list of users.

## Features
- **CRUD Operations**: Allows adding, editing, and deleting users.
- **Responsive Design**: Built with Bootstrap for a responsive and mobile-friendly layout.
- **User Form**: Includes custom validation for input fields such as First Name, Last Name, and Email.
- **Elegant Toasts**: Provides user-friendly toasts for actions like adding or deleting users.
- **Pagination**: Displays users in pages for easier navigation.

## Tech Stack
- **React**: For building the user interface.
- **VITE**: For fast development and bundling.
- **JSONPlaceholder API**: For simulating user data interactions.
- **Bootstrap**: For responsive layout and styling.

## Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate into the project directory**:
   ```bash
   cd user-management-dashboard
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Screenshots

- **Dashboard**
![Dashboard](https://github.com/user-attachments/assets/fa4448a5-a337-474a-be9d-8a9dffdd3490)


- **User Form Validation**
![Add-user](https://github.com/user-attachments/assets/bb837bed-cae3-4414-bfff-3a5b859a8595)
  

## Error Handling

- If any API request fails, an error message will be displayed using an elegant toast notification to inform the user.
