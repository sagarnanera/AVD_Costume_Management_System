const { upload } = require("../config/config");
const { cloudinary } = require("../config/config");

// cloudinary.config({
//   cloud_name: "ddrfr7ayb",
//   api_key: "378927538853461",
//   api_secret: "pqQjfT5NuVoiqtq6GmM7_rCVZMY"
// });

// const upload = multer({ storage: multer.diskStorage({}) });

// const fileUploaderMiddleware = (fieldName, maxCount) => {
//   return (req, res, next) => {
//     upload.array(fieldName, maxCount)(req, res, err => {
//       if (err) {
//         console.error("Error in middleware: " + err);
//         return res
//           .status(400)
//           .json({ success: false, message: "File upload failed" });
//       }

//       // console.log("files " + req.files);
//       if (!req.files || req.files.length === 0) {
//         return res
//           .status(400)
//           .json({ success: false, message: "No files uploaded!!" });
//       }
//       let fileUrls = [];

//       req.files.forEach(file => {
//         cloudinary.uploader
//           .upload(file.path, { folder: "costume_images" })
//           .then(res => {
//             req.fileUrls.push(res.secure_url);
//           });
//       });

//       // req.fileUrls = fileUrls;

//       next();
//     });
//   };
// };

// module.exports = fileUploaderMiddleware;
const fileUploaderMiddleware = (fieldName, maxCount) => {
  return (req, res, next) => {
    try {
      upload.array(fieldName, maxCount)(req, res, async err => {
        if (err) {
          console.error("Error in multer middleware: " + err);
          return res
            .status(400)
            .json({ success: false, message: "File upload failed" });
        }

        if (!req.files || req.files.length === 0) {
          return res
            .status(400)
            .json({ success: false, message: "No files uploaded!!" });
        }

        const fileUrls = [];

        for (const file of req.files) {
          try {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: "costume_images"
            });
            fileUrls.push(result.secure_url);
          } catch (uploadErr) {
            console.error("Error uploading file to Cloudinary: ", uploadErr);
            return res.status(500).json({
              success: false,
              message: "Error uploading file to Cloudinary"
            });
          }
        }

        req.fileUrls = fileUrls;
        next();
      });
    } catch (err) {
      console.error("Error in middleware: " + err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
};

module.exports = fileUploaderMiddleware;
