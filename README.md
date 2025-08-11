# BadgerDownloader

A full-stack application for downloading and converting YouTube videos, Instagram Reels and Twitter videos to various formats. Built with React frontend and Flask backend.

## Features

- Download videos from YouTube URLs or search terms
- Download Instagram Reels
- Download Twitter(X) Videos
- Convert videos to multiple formats (mp4, mp3, opus, vorbis, wav, m4a, flv, webm, ogg, mkv)
- Track download history
- Manage downloaded files

## Current Issues

- Format change on the recent downloads not working 

## Project Structure

- **client/** - React frontend application
  - **src/components/** - UI components (Searchfield, DownloadCard, DownloadedStack, etc.)
  - **src/hooks/** - Custom React hooks for data fetching and state management
  
- **server/** - Flask backend application
  - **src/** - Python source code
    - **routes.py** - API endpoints
    - **yt_downloader.py** - YouTube download functionality using yt-dlp
    - **in_downloader.py** - Instagram download functionality
    - **models.py** - Database models
  - **downloads/** - Directory for downloaded files
  - **instance/** - SQLite database location
  - **logs/** - Application logs
- **cookie_generator/**
  - **cookie_generator.py** - Script to gather Youtube cookies

## Prerequisites

- **Docker** and **docker-compose** (for containerized deployment)
- For development:
  - **Node.js** (v14+) and **npm** for the frontend
  - **Python** (v3.8+) and **pip** for the backend
  - **ffmpeg** for media processing
  - **yt-dlp** for video downloading functionality

## Installation and Setup

### Docker Deployment (Recommended)

The easiest way to run BadgerDownloader is using Docker:

1. Clone the repository:
   ```bash
   git clone https://github.com/Velladriel/BadgerDownloader
   cd BadgerDownloader
   ```

2. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

3. Access the application at http://localhost:3000

#### Windows-Specific Docker Instructions

For Windows users:

1. Make sure Docker Desktop for Windows is installed and running
2. Enable WSL 2 integration in Docker Desktop settings
3. If you encounter path-related issues, ensure Docker has permission to access your drives
4. Use PowerShell or Command Prompt to run Docker commands:
   ```powershell
   docker-compose up --build
   ```

The Docker setup includes:
- Flask backend running on port 5000 (served via Gunicorn for production)
- React frontend running on port 3000 (served via Nginx on port 80 inside the container)
- Persistent volumes for:
  - Downloaded files
  - Database
  - Application logs

### Development Setup

#### Frontend (React)

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   
   Linux/macOS:
   ```bash
   npm run dev
   ```
   
   Or use the provided script:
   ```bash
   ./dev_start_client.sh
   ```
   
   Windows:
   ```cmd
   npm run dev
   ```
   
   Or use the provided batch file:
   ```cmd
   dev_start_client.bat
   ```

4. The frontend will be available at http://localhost:5173 (or the port specified by Vite)

#### Backend (Flask)

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   
   For production deployment, Gunicorn is recommended:
   ```bash
   pip install gunicorn
   ```

4. Start the Flask server:
   ```bash
   python src/app.py
   ```
   
   Or use the provided script:
   
   Linux/macOS:
   ```bash
   ./dev_start_server.sh
   ```
   
   Windows:
   ```cmd
   dev_start_server.bat
   ```

5. The API will be available at http://localhost:5000

   For production deployment with Gunicorn:
   ```bash
   gunicorn src.wsgi:app -b 0.0.0.0:5000
   ```

## Usage

1. Enter a YouTube URL, YouTube search term, or Instagram Reel URL in the search field
2. Select the desired output format from the dropdown menu
3. Click "Download!" to start the download process
4. Once complete, the file will be automatically downloaded to your device
5. Your download history is displayed below the search field

## Cookie problems

If yt_dlp throws a cookie error, refer to
[Cookie generator](cookie_generator/README.md)

## Environment Variables

### Backend
- `FLASK_ENV`: Set to "development" for development mode
- `DOWNLOAD_DIR_LIMIT`: Maximum size for the downloads directory in MB

## Maintenance

The application includes an automatic cleanup mechanism to prevent the downloads directory from exceeding the configured size limit.

### Updating the Application

To update the application with the latest code and rebuild the Docker containers:

Linux/macOS:
```bash
./update.sh
```

Windows:
```cmd
update.bat
```

This script will:
1. Pull the latest code from the repository
2. Rebuild and restart the Docker containers in detached mode

