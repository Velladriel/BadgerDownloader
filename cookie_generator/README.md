# Cookie Generator

A simple utility to log into Google, extract session cookies, and save them for later use with the BadgerDownloader application.

## Table of Contents

- [Prerequisites](#prerequisites)  
- [1. Create a Google Account](#1-create-a-google-account)  
- [2. Configure Environment Variables](#2-configure-environment-variables)  
- [3. Running with Docker Compose](#3-running-with-docker-compose)  

---

## Prerequisites

- Docker & Docker Compose installed  
- A Google account (email + password)  
- A `.env` file in the cookie_generator directory  

---

## 1. Create a Google Account

If you don't already have a Google account:

1. Visit https://accounts.google.com/signup  
2. Follow the on-screen steps to create your new account.  
3. Verify your email & complete any CAPTCHA checks.  

---

## 2. Configure Environment Variables

1. In the cookie_generator directory, copy the template to create a `.env` file:  
   ```bash
   cp .env.template .env
   ```

2. Open `.env` in your editor and set your Google credentials:  
   ```dotenv
   GOOGLE_EMAIL=your.email@gmail.com
   GOOGLE_PW=superSecurePassword
   ```

---

## 3. Running with Docker Compose

The cookie generator is configured to run as a service in the BadgerDownloader application's docker-compose setup. It runs on a cron schedule (every minute) to ensure your cookies are always fresh.

1. Make sure your `.env` file is properly configured in the cookie_generator directory.

2. Start the cookie generator service using the "cookies" profile:
   ```bash
   docker-compose --profile cookies up -d
   ```
3. The service will automatically:
   - Run on a schedule (see `cookie-cron` file)
   - Save cookies to a shared volume that the main application can access
   - Log its activity to /app/cron.log inside the container

4. To stop the service:
   ```bash
   docker-compose stop cookie_generator
   ```

---

## 4. Google authentification
   
   It might be possible that Google wants verification. If yes run
   ```bash
   python cookie_generator.py -m
   ```
   This will run the script without the headless mode to let the user do the verification.
   This might happen the first time the script is running on the machine. 
  
   For ssh: SSH needs to run with the -X flag for this to function

That's it! The cookie generator will keep your Google cookies fresh for the BadgerDownloader application. The cookies are stored in a shared Docker volume named "cookie_data" that is automatically mounted by the server service.