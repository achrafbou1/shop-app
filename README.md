# Application overview

An application that allows users to create an account and to see the list of all the nearby shops, as well as to keep track of their favorite ones.

## Installation

# Getting Started

To get the Node server running locally:
- Install Node from https://nodejs.org/en/download/
- Clone this repo
- Run `npm install` to install all required dependencies
- Run `npm start` to start the local server

# Code Overview

## Dependencies

- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-session](https://github.com/expressjs/session) - For creating a session middleware
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [passport](https://github.com/jaredhanson/passport) - For handling user authentication
- [passport-local](https://github.com/jaredhanson/passport-local) - Passport strategy for authentication
- [body-parser](https://github.com/expressjs/body-parser) - For parsing incoming body requests
- [cookie-parser](https://github.com/expressjs/cookie-parser) - For parsing cookies headers
- [bcrypt-nodejs](https://github.com/kelektiv/node.bcrypt.js) - For hashing passwords during authentication and sign up
- [connect-flash](https://github.com/jaredhanson/connect-flash) - For displaying flash messages during authentication
- [ejs](https://github.com/tj/ejs) - For rendering views
- [morgan](https://github.com/expressjs/morgan) - For logging HTTP requests
- [path](https://github.com/jinder/path) For working with file and directory paths


## Application Structure

- `server.js` - The entry point to the application. This file defines the express server and connects it to MongoDB using mongoose. It also requires the routes and models used in the application.
- `config/` - This folder contains configuration for passport as well as for the database.
- `app/routes/` - This folder contains the routes of the application.
- `app/models/` - This folder contains the schema definitions for the Mongoose models used.
- `views/` - This folder contains the views rendered (using EJS).
- `public/` - This folder contains the static files (CSS and JavaScript).
