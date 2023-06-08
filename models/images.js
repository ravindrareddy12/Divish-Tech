const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const AVATAR_PATH = path.join('uploads', 'users', 'avatar');

const uploadSchema = new mongoose.Schema({
  filename: String,
  path: String,
  originalname: String
}, {
  timestamps: true
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, AVATAR_PATH);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

uploadSchema.statics.uploadAvatar = multer({ storage: storage }).single('avatar');
uploadSchema.statics.avatarPath = AVATAR_PATH;



const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;


// const mongoose = require('mongoose');
// const multer = require('multer')
// const path = require('path')
// const AVATAR_PATH = path.join('/uploads/users/avatar')

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     avatar:{
//         type:String
//     }
// }, {
//     timestamps: true
// });

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname,'..',AVATAR_PATH))
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })

// userSchema.statics.uploadAvatar = multer({storage: storage}).single('avatar')

// userSchema.statics.avatarPath = AVATAR_PATH
  


// const User = mongoose.model('User', userSchema);

// module.exports = User;