const {readFile, writeFile, readdir} = require('fs/promises');
const express = require('express');
const { createId } = require('./utils');
const app = express();

const base = `${__dirname}/data`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send({status: res.statusCode, msg: 'Hello World!'})
})

app.get('/api/owners/:id', (req, res) => {
    readFile(`${base}/owners/${req.params.id}.json`, 'utf8')
        .then((data) => res.status(200).send(data))
        .catch((err) => console.log(err))
});

app.get('/api/owners', (req, res) => {
    readdir(`${base}/owners`)
    .then((fileNames) => {
        const allOwners = [];
        fileNames.forEach((file) => {
            readFile(`${base}/owners/${file}`, 'utf8')
                .then((ownerObj) => {
                    allOwners.push(JSON.parse(ownerObj))
                    if (allOwners.length === fileNames.length) {
                        res.status(200).send(allOwners)
                    }
                })
        })
    })
    .catch((err) => console.log(err))
});

app.get('/api/owners/:id/pets', (req, res) => {
    const ownerId = req.params.id;
    readdir(base + '/pets')
        .then((petsFiles) => {
            const pets = [];
            let count = 0;
            petsFiles.forEach((file) => {
                readFile(`${base}/pets/${file}`, 'utf8')
                .then((petObj) => {
                    const parsedObj = JSON.parse(petObj);
                    if (parsedObj.owner === ownerId) {
                        pets.push(parsedObj)
                    };
                    if (++count === petsFiles.length) {
                        res.status(200).send(pets)
                    }
                })
            })
        })
        .catch((err) => console.log(err))
});

app.get('/api/pets', (req, res) => {
    const {query} = req;
    const [q1] = Object.keys(query)
    const [value] = Object.values(query)

    readdir(`${base}/pets`)
        .then((petFiles) => {
            const allPets = [];
            let count = 0;
            petFiles.forEach((file) => {
                readFile(`${base}/pets/${file}`, 'utf8')
                .then((petObj) => {
                    const parsedObj = JSON.parse(petObj)

                    if (q1) {
                        if (parsedObj[q1] === value) {
                            allPets.push(parsedObj)
                        }
                    } else {
                        allPets.push(parsedObj)
                    }

                    if (++count === petFiles.length) {
                        res.status(200).send(allPets)
                    }
                })
            })
        })
        .catch((err) => console.log(err))
});

app.get('/api/pets/:id', (req, res) => {
    readFile(`${base}/pets/${req.params.id}.json`, 'utf8')
        .then((petObj) => res.status(200).send(petObj))
        .catch((err) => console.log(err.path))
});

app.patch('/api/owners/:id', (req, res) => {
    const {body, params} = req;
    readFile(`${base}/owners/${params.id}.json`, 'utf8')
        .then((data) => {
            const updated = Object.assign(JSON.parse(data), body)
            return Promise.all([
                updated,
                writeFile(`${base}/owners/${params.id}.json`, JSON.stringify(updated, null, 2))
            ])
        })
        .then(([updated, ]) => res.status(201).send({msg : 'Success!', updated}))
        .catch((err) => console.log(err))
});

app.post('/api/owners', (req, res) => {
    const {body} = req;

    createId()
        .then((values) => {
            const newBody = {id: values, ...body}
            return Promise.all([
                newBody,
                writeFile(`${base}/owners/${values}.json`, JSON.stringify(newBody, null, 2))
            ])
        })
        .then(([newBody, ]) => res.status(201).send({msg: 'Success!', newBody}))
});



app.listen(5555, (err) => {
    console.log(err ? err : 'Express server listening...')
});