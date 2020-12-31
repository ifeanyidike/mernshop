# mernshop
This app is hosted at [spicymernshopapp.herokuapp.com](https://spicymernshopapp.herokuapp.com).

# MERNSHOP

This is a full MERN stack build with **React**, **Redux**, **Redux Thunk**, **Bootstrap**, **React Bootstrap**, **routing with React Router DOM**, in the frontend 
and **Node.js**, **Express**, **JSON web token**, **REST API**, **MongoDB**, **Mongoose** in the backend.

The app makes use of `full local authentication`, thanks to JSON web token. This includes both users registration and login.

## Front end architecture
The structure of the frontend is simple. The reusable components are organized in the `components` folder. 
Redux actions, reducers, and constants are organized into separate folders. I made use of Redux Thunk to return a function from the actions rather than an action object.
Also, `combineReducers` was used to combine the reducers before supplying them to the store. 
Additionally, **react router dom** is used for proper routing of the app. The pages are organized in a separate folder named `Screens`. This organization makes the project simple and easy to navigate.

## Back end architecture.
The backend is also structured in a simple way. The backend routes are organized in the `routes` folder. This folder contains the `userRoutes`, `productRoutes`, `orderRoutes`, etc.
The `controllers` folder contain the controllers which supply the functions needed by the routes. This contains the functionality that define the behavior of the app.
The routes are fed into the `server.js` app which controls the entire app. Also, the `middlewares` are stored in the middleware folder, and other utilities are stored in utils.

