const AWS = require("aws-sdk");
// name of your bucket here
const NAME_OF_BUCKET = process.env.AWS_BUCKET_NAME

const multer = require("multer");

//  make sure to set environment variables in production for:
//  AWS_ACCESS_KEY_ID
//  AWS_SECRET_ACCESS_KEY
//  and aws will automatically use those environment variables

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// --------------------------- Public UPLOAD ------------------------

const singlePublicFileUpload = async (file) => {
    const { originalname, mimetype, buffer } = await file;
    const path = require("path");
    // name of the file in your S3 bucket will be the date in ms plus the extension name
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
        Bucket: NAME_OF_BUCKET,
        Key,
        Body: buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
    };
    const result = await s3.upload(uploadParams).promise();

    // save the name of the file in your bucket as the key in your database to retrieve for later
    return result.Location;
};

const multiplePublicFileUpload = async (files) => {
    return await Promise.all(
        files.map((file) => {
            return singlePublicFileUpload(file);
        })
    );
};

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, "");
    },
});
const singleMulterUpload = (nameOfKey) =>
    multer({ storage: storage }).single(nameOfKey);
const multipleMulterUpload = (nameOfKey) =>
    multer({ storage: storage }).array(nameOfKey);

module.exports = {
    s3,
    singlePublicFileUpload,
    multiplePublicFileUpload,
    singleMulterUpload,
    multipleMulterUpload,
}
