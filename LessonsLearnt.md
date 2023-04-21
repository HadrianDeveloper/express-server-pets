



### create a new command line
In order to create a CLI command, you need to create a script in Package.json.
Eg - to create this command `npm run dev` to replace `nodemon server.js`:

 `"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon app.js"
  },`