# loanifly
[![Build Status](https://travis-ci.org/dusmel/loanifly.svg?branch=develop)](https://travis-ci.org/dusmel/loanifly)
[![Coverage Status](https://coveralls.io/repos/github/dusmel/loanifly/badge.svg?branch=ch-setup-tdd-project-164866971)](https://coveralls.io/github/dusmel/loanifly?branch=ch-setup-tdd-project-164866971)

## Getting Started
-------------------
* Clone the repo on your desktop and get your postman or browser ready to consume the endpoints.

### Starting ther server
------------------------
* ```$ npm start```
### Running the Tests
-----------------------
* ```npm test``` 
### Testing the code sytle with eslint
--------------------------------------
* ```$ ./node_modules/ .bin/eslint server```
### Heroku Deployment
------------------
* $ git push heroku develop:master

----------------------------------------------------

## Endpoints

### User Endpoints

|HTTP Method| Endpoint| Activity|
|-----------|:---------:|:---------:|
|POST|/api/v1/auth/signup|Create user|
|POST|/api/v1/auth/login| Sign in|
|GET|/api/v1/users|View users|
|GET|/api/v1/:id|View specific user|
|GET|/api/v1/loans|View all loans|
|GET|/api/v1/|Total loans|
|GET|/api/v1/loan/:id|View specific loan|
|GET|/api/v1/contributions|View all contributions for contributors|
|GET|/api/v1/contributions/:id|View specific contribution|
|PUT|/api/v1/loans/:id|Grant or reject|
|GET|/api/v1/loan/paid|View total amount paid|
|POST|/api/v1/contributions|Contribute|
|GET|/api/v1/condtributions|View own contributions|
|PUT|/api/v1/contributions/:id/pay|Pay a contributer|
|PUT|/api/v1/loans/pay|Pay loan|
|DELETE|/api/v1/loans/:id|Cancel the loan request|
|PUT|/api/v1/loans/:id|Update request|
|POST|/api/v1/loans|Create request|
|DELETE|/api/v1/users/:id|Delete user|






#### Author
-----------
* Wakanda Andela - Kigali Cohort3

#### License
-------------
* This project is licenced under the MIT License
