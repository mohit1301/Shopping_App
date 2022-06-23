# Shopping_App_using_Node.js

This is a simple shopping app bulit using Node.js, Express.js and MongoDB as database. A user can has 2 options - Register as a new user or login as existing user. A user can add, update or delete products in the cart.
Updating products in the inventory can only be done by the a user registered as 'Admin', which can only be added by making changes in the database.
Also, the features like authentication and authorization are implemented using jwt tokens.

To run the project, 
1. Install the required packages using the command  - 'npm i'
2. Add a dotenv file containig environment variables - 'TOKEN_KEY' contaning the jwt token secret key and 'MONGO_URL' containing the mongodb connection string.
3. run the project using the command - 'npm run server' or 'nodemon app.js' or 'node app.js'
