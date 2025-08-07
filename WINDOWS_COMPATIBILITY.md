# Windows Compatibility Changes

This document summarizes the changes made to make the Docker part work on Windows.

## Created Windows Batch Files

- `client/dev_start_client.bat` - Windows equivalent of the client development script
- `server/dev_start_server.bat` - Windows equivalent of the server development script
- `update.bat` - Windows equivalent of the update script

## Modified Docker Configuration Files

- Updated `client/Dockerfile` to remove Linux-specific commands (`ls -la`)
- Changed hardcoded IP in `client/Dockerfile` to use service name (`server`) for better cross-platform compatibility
- Updated `docker-compose.yml` to explicitly set volume drivers to `local` for Windows compatibility

## Updated Documentation

- Added Windows-specific Docker setup instructions in README.md
- Added Windows-specific development instructions for both client and server
- Updated the application update section to include Windows commands

These changes ensure that the Docker setup works correctly on Windows while maintaining compatibility with Linux/macOS.