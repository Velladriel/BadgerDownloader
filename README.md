# Overview

This repository contains a simple project split into a React frontend and a Python backend using Flask. It allows you to download and convert YouTube videos by providing a URL or search and selecting a target format.

## Project Structure

- **client/src/App.jsx**  
  Main React component that sets up the application layout.

- **client/src/components/**

  React components for frontend.

- **server/src/yt_downloader.py**  
  Python module using `yt-dlp` for downloading and converting videos.

- **server/src/routes.py**  
  Flask routes for handling the API endpoint.

## Prerequisites

- **Node.js** and **npm** installed for the frontend.
- **Python**  and **pip** installed for the backend.

## Installation

1. **Frontend**  
   - Navigate to `client`  
   - Run `npm install`  
   - Then `npm run dev` (or `./dev_start_client.sh`) to start the development server.

2. **Backend**  
   - Navigate to `server`  
   - Create and activate a virtual environment  
   - Run `pip install -r requirements.txt`  
   - Start the Flask server (e.g., `./dev_start_server.sh` or your entry point).

## Usage

1. Open the frontend in your browser at `http://ip:3000`.
2. Enter the YouTube URL or search  in the field.
3. Select your desired format.
4. Click **Download!** to receive your file.

## Planned features

1. Support for other websites (e.g. Instagram, Twitter (if possible))
2. Better UI
3. Better deployment