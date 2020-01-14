const path = require("path");
const fs = require("fs");
const resizeImg = require("resize-img");

// RETURN IMAGE WITH

// Filter file
exports.fileFilter = (file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|gfif|bmp)$/)) {
    const error = new Error(
      "You can only upload an image in JPEG, PNG, GIF, GFIF, or BMP format."
    );
    error.statusCode = 422;
    cb(error, false);
  }
  cb(true);
};

exports.deleteFile = paths => {
  fs.unlink(paths, (err, result) => {
    if (err) return false;
    return true;
  });
};

// resize image
exports.resizeImage = (width, height, path) => {
  resizeImg(fs.readFileSync(path), {
    width: width,
    height: height
  }).then(buf => {
    fs.writeFileSync(path, buf);
  });
};
