# Fundoo Notes Frontend

Fundoo Notes is a React-based web application inspired by Google Keep, designed for creating, managing, and organizing notes with a clean and intuitive user interface. It provides features like adding notes, archiving, moving to trash, restoring, and permanently deleting notes, with seamless integration to a backend API for data persistence.

## Table of Contents

* Features
* Technologies Used
* Getting Started

  * Prerequisites
  * Installation
  * Running the Application
* Project Structure
* API Integration
* Contributing
* License
* Contact

## Features

* **Create Notes**: Add new notes with titles, descriptions, and optional rich text formatting.
* **Archive Notes**: Move notes to an archive for later reference without cluttering the main view.
* **Trash Notes**: Send notes to a trash section for temporary storage.
* **Restore Notes**: Recover notes from the trash or archive back to the main notes list.
* **Delete Notes**: Permanently delete notes from the trash.
* **Responsive Design**: Optimized for both desktop and mobile devices.
* **Sort and Filter**: Organize notes by relevance, title, or price (inspired by the provided book app context).
* **API Integration**: Connects to a backend API for real-time data persistence and retrieval.

## Technologies Used

* **Frontend**: React, React Router, Material-UI (MUI)
* **Styling**: SCSS modules for modular and maintainable styles
* **State Management**: React Context API for managing notes and user authentication
* **API Requests**: Custom `useAPI` hook for handling HTTP requests
* **Routing**: React Router for navigation between pages
* **Icons**: MUI Icons for star ratings and other UI elements
* **Dependencies**: Axios (or similar) for API calls, React Hooks for state and side effects

## Getting Started

### Prerequisites

* **Node.js**: Version 14.x or higher
* **npm**: Version 6.x or higher (or Yarn)
* **Backend API**: A running backend server with endpoints for notes (e.g., `/api/Note/GetAllNotes`, `/api/Note/NoteId`, etc.)
* **Authentication Token**: A valid JWT token for API authorization (if applicable)

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/fundoo-notes-frontend.git
cd fundoo-notes-frontend
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Set up environment variables:
Create a `.env` file in the root directory and add the backend API URL:

```env
REACT_APP_API_URL=http://your-backend-api-url
```

### Running the Application

Start the development server:

```bash
npm start
# or
yarn start
```

The app will run at `http://localhost:3000`.

Build for production:

```bash
npm run build
# or
yarn build
```

## Project Structure

```
fundoo-notes-frontend/
├── public/                    # Static assets
├── src/
│   ├── components/            # Reusable UI components (e.g., NoteCard)
│   ├── context/               # React Context for state management (e.g., NoteContext, AuthContext)
│   ├── hooks/                 # Custom hooks (e.g., useFetchNotes, useAPI)
│   ├── pages/                 # Page components (e.g., Home, NoteDetails, Trash, Archive)
│   ├── utils/                 # Utility functions (e.g., DropdownStyles)
│   ├── App.jsx                # Main app component with routing
│   ├── index.jsx              # Entry point
├── package.json               # Project dependencies and scripts
├── README.md                  # This file
```

## API Integration

The frontend integrates with a backend API to manage notes. Key endpoints include:

* `GET /api/Note/GetAllNotes`: Fetch all notes.
* `GET /api/Note/NoteId?noteId={id}`: Fetch a note by ID.
* `POST /api/Note/Create`: Create a new note.
* `PUT /api/Note/Archive`: Archive a note.
* `PUT /api/Note/Trash`: Move a note to trash.
* `PUT /api/Note/Restore`: Restore a note from trash or archive.
* `DELETE /api/Note/Delete`: Permanently delete a note.

Ensure the backend server is running and accessible at the URL specified in `.env`. Authentication is handled via a Bearer token passed in the `Authorization` header.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code follows the project's coding standards and includes relevant tests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For questions or feedback, reach out to \[Garvit Chugh] at \[[gavi.chugh@gmail.com](mailto:gavi.chugh@gmail.com)] or open an issue on GitHub.