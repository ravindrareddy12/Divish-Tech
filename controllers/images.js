const Upload = require('../models/images');

module.exports.upload = async function(req, res) {
  try {
    Upload.uploadAvatar(req, res, function(err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (req.file) {
        const upload = new Upload({
          filename: req.file.filename,
          path: req.file.path,
          originalname: req.file.originalname,
        });

        upload.save(function(err) {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          
          return res.redirect('back')
        });
      } else {
        return res.status(400).json({ error: 'No file uploaded' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
