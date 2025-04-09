# Overview

This repository contains a simple project split into a React frontend and a Python backend using Flask. It allows you to download and convert YouTube videos by providing a URL or searching and selecting a target format. This project is a heavy work in progress.

## Project Structure

- **client/src/App.jsx**  
  Main React component that sets up the application layout.

- **client/src/components/**  
  React components for the frontend.

- **server/src/yt_downloader.py**  
  Python module using `yt-dlp` for downloading and converting videos.

- **server/src/routes.py**  
  Flask routes to handle API endpoints.

## Prerequisites

- **Node.js** and **npm** for the frontend.
- **Python** and **pip** for the backend.
- **Docker** installed to run containers.

## Installation

### Frontend (Development)

1. Navigate to the `client` directory.
2. Run `npm install`.
3. Start the development server with `npm run dev` (or using the provided shell script).

### Backend (Development)

1. Navigate to the `server` directory.
2. Create and activate a virtual environment.
3. Run `pip install -r requirements.txt`.
4. Start the Flask server (for example, via `./dev_start_server.sh` or your chosen entry point).

## Docker Deployment

This project is fully dockerized. To run the entire application using Docker and docker-compose:

1. Ensure Docker is installed and running.
2. From the project root directory, execute:

   ```bash
   docker-compose up --build