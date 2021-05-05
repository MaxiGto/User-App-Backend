# User App Backend

This backend was created using Express/Node and MongoDb Atlas + Mongoose.

In the project directory you need to install all necessary dependencies using the command:

```
npm install
```

Then you can run the app in development mode with:

```
npm start
```

## Endpoints

There are four different endpoints:

```

ENDPOINT: CREATE USER

POST /api/v0/new

```

This endpoint is used to create the users in the database. However, the DB is now in read-only mode for data protection. You can edit the connection string located in the .env file to change the configuration. Feel free to test this functionality! 
<br>
<br>

```

ENDPOINT: AUTHENTICATION

POST /api/v0/authenticate

```

For user authentication.
<br>
<br>

```

ENDPOINT: JWT RENEW

POST /api/v0/renew

```
Renews the JSON Web Token.
<br>
<br>

```

ENDPOINT: USER INFO

POST /api/v0/user/me

```
Fetches user info.
<br>
<br>

## Users

User credentials to log in:

```
email: it@drixit.com
password: some-password
````
or

```
email: info@drixit.com
password: other-password
```

## Configuration

You can find and edit the configuration in .env file located in the root directory

## Extra documentation

More documentation (written using JSDoc) can be found in the source code.

