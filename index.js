const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, 'database.json');

    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading from database' });
        }

        let currentData = [];
        if (fileData) {
            currentData = JSON.parse(fileData);
        }

        currentData.push(data);

        fs.writeFile(filePath, JSON.stringify(currentData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing to database' });
            }

            res.status(200).json({ message: 'Form submitted!' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running.`);
});