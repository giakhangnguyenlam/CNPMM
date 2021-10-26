// This service references from https://github.com/gauti123456/NodeExpressDriveUpload/blob/master/app.js
// And https://www.daimto.com/upload-image-to-google-drive-with-node-js/
// I modified for suitable this project
var path = require('path');
const OAuth2Data = path.join(__dirname, "../", "googledrive.json")
const {google} = require('googleapis');
const fs = require("fs");

const multer = require('multer')

console.log("Path for oatuth2: " + OAuth2Data);


const SCOPES =
  "https://www.googleapis.com/auth/drive";


const oAuth2Client = new google.auth.GoogleAuth({
  keyFile: OAuth2Data,
  scopes: SCOPES
});

console.log("Path for .env" + process.env.PATH_IMAGE);

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      console.log("Path images: " + path.join(__dirname, "../images"));
      callback(null, path.join(__dirname, "../images"));
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

var upload = multer({
    storage: Storage,
}).single("file");

var uploadImage = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.json("Something went wrong");
    } else {
      console.log(req.file.path);
      const drive = google.drive({ version: "v3",auth:oAuth2Client  });
      const fileMetadata = {
        name: req.file.filename,
        'parents':  ['1uJMW7p7qso3-ctKDDq3_qxNZ4IwkIP8z']
      };
      const media = {
        mimeType: req.file.mimetype,
        body: fs.createReadStream(req.file.path),
      };
      drive.files.create(
        {
          resource: fileMetadata,
          media: media
        },
        (err, file) => {
          if (err) {
            // Handle error
            console.error(err);
          } else {
            fs.unlinkSync(req.file.path);
            return res.json("https://drive.google.com/uc?id="+file.data.id+"&export=download");
          }

        }
      );
    }
});  
}



module.exports = {
    uploadImage
}