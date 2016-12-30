"use strict";
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const database = require("./database");
const upload = multer({
    dest: path.resolve(__dirname, '../data/images')
});
function init(app, db) {
    app.get('/image/:id', (req, res) => {
        database.getImagePath(db, req.params.id)
            .then(imagePath => res.sendFile(imagePath))
            .catch(error => res.send({ error }));
    });
    app.get('/thumb/:id', (req, res) => { });
    app.get('/tags/:id', (req, res) => { });
    app.get('/images', (req, res) => {
        database.getImages(db)
            .then(images => res.send({ images }));
    });
    app.post('/tag/:id/:tag', (req, res) => { });
    app.delete('/tag/:id/:tag', (req, res) => { });
    app.post('/upload', upload.single('image'), (req, res) => {
        const id = req.file.filename;
        const extension = path.parse(req.file.originalname).ext;
        const filename = req.file.path + extension;
        fs.rename(req.file.path, filename);
        database.addImage(db, id, filename)
            .then(() => console.log(`added image ${id}`))
            .catch(err => console.error(err));
    });
}
exports.init = init;
