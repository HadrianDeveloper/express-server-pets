
### to return a promised forEach
Return not after the forEach loop but within:

    ` .then((fileNames) => {
            const allOwners = [];
            fileNames.forEach((file) => {
                readFile(filename, 'utf8')
                    .then((ownerObj) => {
                        allOwners.push(JSON.parse(ownerObj))
                        if (allOwners.length === fileNames.length) {
                            res.status(200).send(allOwners)
                        } ... `



### create a new command line
In order to create a CLI command, you need to create a script in Package.json.
Eg - to create this command `npm run dev` to replace `nodemon server.js`:

    `"scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "nodemon app.js"
      },`


### Examples of when to use Promise.all()
Returning writeFile() and the updated object


### patching an object
Object.assign() seems great for updating unfixed nuymber of values in an obj:

    `readFile(`file.json`, 'utf8')
        .then((originalObj) => {
            const updated = Object.assign(JSON.parse(originalObj), update)
            return Promise.all([
                updated,
                writeFile(`file.json`, JSON.stringify(updated, null, 2))
            ])
        .then(() => ... )
