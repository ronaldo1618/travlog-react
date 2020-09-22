
# Travlog Overview
Travlog is a full stack app created for users that like to plan trips out and keep track of all the trips they've been on. Users will register/login with token based authentication with the help of Django. Once the user is logged in, they will be able to get started planning their trips or search for trips created by other users!

## Getting Started
  To get started:
  * Register an account
  
  Find a trip:
  * Search for other users trips
  * Click on a trip you like
  * Now you can view the details of the trip or copy the trip and set it as one of your trips!
  
  Create a trip:
  * Go to trips tab and click new trip
  * Fill out the initial trip info(*) ** Note: if you want to save this trip to your homepage for easy editing, click the view on homepage box!**
  * After clicking submit, you will be directed to that trips detail view where you can start planning out the itinerary for it!
  * Now you have a trip planned out!

## Initial Setup of Travlog
  Follow these steps to get started:
  1. (*) **Note: this app has a back end that will need to be downloaded as well. Follow this link to do this first https://github.com/ronaldo1618/travlogapi**
  1. `git clone git@github.com:ronaldo1618/travlog-react.git`
  1. `cd` into Travlog
  1. `npm install` for dependencies
  1. `npm start` Should automatically open in chrome, if not type in 'http://localhost:3000' in your browser.

  Now to get the server up:
  1. Open a new terminal tab
  1. `cd travlog`
  1. `source ./travlogenv/bin/activate`
  1. `python manage.py runserver`

## Technologies Used
  This app utilizes these technologies:
  * This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
  * [Semantic UI](https://react.semantic-ui.com/) for icons
  * [React Router](https://reacttraining.com/react-router/) for page routing
  * [Reactstrap](https://reactstrap.github.io/) for forms, buttons, cards
  * [Django](https://www.djangoproject.com/) for building out a rest api with ORM
  * [moment-js](https://momentjs.com/) for dates

## Skills Utilized
  1. API Calls: POST, PUT, DELETE, GET
  1. JavaScript: Objects, Arrays, Functions, etc.
  1. Python: Dicts, Lists, Classes, Methods         1. Django: Models, ORMS, Serializers, Routers
  1. Github Scrum workflow
  1. CSS
  1. Semantic HTML
  1. React: hooks, props, routes

## Troubleshooting
  If you are having trouble getting the application running:
  * Double check your file paths to make sure they are in the right directories
  * Make sure all dependencies are installed
  * Check to make sure your servers are correct. Should be `localhost:3000` for app and `localhost:8000` for the server.
  * Contact me through my linkedin and I would be happy to try and help (https://www.linkedin.com/in/ronald-lankford/)
