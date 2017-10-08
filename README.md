# Readable - Brew Jabber - App using React and Redux

## Introduction
This web app is content and comment web app. Users can add posts to a pre-set list of categories and to add comments to them. Posts and comments can be voted on, edited or deleted.

The app was built as the second project for the React nanodegree at Udacity. I started with a backend API provided by Udacity and then I built the frontend using React and Redux.

The backend server was updated with a new endpoint to allow it to retreive all comments rather than needing to get them one by one for each post. Also, the categories and seed data was customized for this project.

## Installation and Setup

### Setup the backend server
- Clone or download the repository from GitHub
- go to the backend directory in the terminal/prompt.
- Run the command `npm install`
- When that is done, run the command `npm start`
- This should run a local server on port 5001

### Setup the front end
- Open up a comand terminal/prompt and go to the top level directory within the repository.
- Run the command `npm install`
- When that is done, run the command `npm start`
- This should run start a local web server and open a web browser window to the page. If it doesn't open a browser window, you can go to the following url `http://localhost:3000/`


## Backend Server

The backend server was provided by Udacity and then customized by for this project. I added the `/comments` endpoint to get a list of all comments for all posts and updated the categories and seed data. For details, check out [README.md](backend/README.md).

## Contributing

This project was done as a student in the Udacity React Nanodegree program. Since it is project to show my own code, contributions will not be accepted.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
