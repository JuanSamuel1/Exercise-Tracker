# Exercise Tracker
<!-- ABOUT THE PROJECT -->
## About The Project

![project screenshot](https://github.com/JuanSamuel1/Timestamp-Microservice/blob/main/timestamp-microservice.PNG)

Creating this project is part of my backend web development learning in a course by freecodecamp. Exercise Tracker allows people to create an account and keep track of exercises that need to be done.
You can see the demo of the microservice in this link: https://exercise-tracker-juan.glitch.me

The API will work like the following:
* You can POST to /api/users with form data username to create a new user. The returned response will be an object with username and _id properties.
* You can make a GET request to /api/users to get an array of all users. Each element in the array is an object containing a user's username and _id.
* You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used. The response returned will be the user object with the exercise fields added.
* You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user. The returned response will be the user object with a log array of all the exercises added. Each log item has the description, duration, and date properties.
* A request to a user's log (/api/users/:_id/logs) returns an object with a count property representing the number of exercises returned.
* You can add from, to and limit parameters to a /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.

Well, in my opinion, this is the hardest challenge compared to the other projects in the course. I learn handling request and response, database management, and other complex methods.

I hope this is useful for you, any feedback is warmly accepted! Thank you, 🤟.

### Built With

Here is the list of major frameworks used to built the project.
* [Node JS](https://nodejs.org/en/)
* [Mongo DB](https://www.mongodb.com/)

<!-- GETTING STARTED -->
## Getting Started

This is how set up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Here is the prerequisites of the project.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/JuanSamuel1/Timestamp-Microservice.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

