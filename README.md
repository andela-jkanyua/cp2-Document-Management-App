# DMS-Sys [![Build Status](https://travis-ci.org/andela-jkanyua/cp2-Document-Management-App.svg?branch=develop)](https://travis-ci.org/andela-jkanyua/cp2-Document-Management-App) [![Coverage Status](https://coveralls.io/repos/github/andela-jkanyua/cp2-Document-Management-App/badge.svg?branch=feature%2F142465895%2Fdocument-api)](https://coveralls.io/github/andela-jkanyua/cp2-Document-Management-App?branch=feature%2F142465895%2Fdocument-api)
DMS-Sys - Document Management System

- DMS-Sys is a scalable web-based document handler. It allows users to manage their documents online. It runs on a public API at https://dms-cp2.herokuapp.com/

Core Technologies
-----------
- [NodeJs](http://nodejs.org)
- [Express](http://expressjs.com)
- [Postgres](http://postgresql.com)
- [Sequelize](http://sequelizejs.com)

How to run
------------
1.  Install Node and Postgresql in your machine
2.  Clone project `git clone https://github.com/andela-jkanyua/cp2-Document-Management-App`
3.  `cd cp2-Document-Management-App`
4.  Run`npm install` to install dependencies
5.  To start the app,run `npm start` and head to Postman to interact with the API
6.  Run tests by running `npm test-server`

## API ENDPOINTS

**Users**

VERB | Endpoint | Action
------------ | -------- | ------
GET | /api/users | This endpoint fetches all users
GET | api/users/?limit={integer}&offset={integer} | This endpoint fetches all users and paginates
POST | /api/users | This endpoint creates a new user
PUT | /api/users/:id | This endpoint edits user's details
GET | /api/users/:id | This endpoint gets details of a specific user
DELETE | /api/users/id |This endpoint deletes a user from the system
GET | /api/search/users?| This endpoint searches a user by query param

**Documents**
VERB| Endpoint | Action
------------ | -------- | ------
POST | /api/documents | This endpoint creates a new document
GET | /api/documents/:id | This endpoint gets a specific document
PUT | /api/documents/:id | This endpoint Update a specific document
DELETE | /api/documents/:id | This endpoint Delete a specific document
POST | /api/documents/search | This endpoint searches against documents
POST | /api/documents/title | This endpoint searches against documents by title
GET | /api/users/:userId/documents | This endpoint Finds documents belonging to a certain user
GET | /api/documents?limit={integer}&offset={integer}| Fetches documents but paginates result
GET | api/search/documents/?q={doctitle} | Searches documents title and Content

**Roles**

VERB | Endpoint | Action
------------ | -------- | ------
POST | /api/roles | This endpoint adds a new role into the system
GET | /api/roles | This endpoint displays available roles
PUT | /api/roles/:id | This endpoint updates a specific role
DELETE | /api/roles/:id | This endpoint deletes a role

**Documentation**

VERB | Endpoint | Action
------------ | -------- | ------
GET | api/docs | This endpoint displays the API documentation

Deployment can be found [here](https://dms-cp2.herokuapp.com/)

Detailed documentation can be found [here](https://dms-cp2.herokuapp.com/docs)
