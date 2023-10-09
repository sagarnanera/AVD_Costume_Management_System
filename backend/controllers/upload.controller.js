exports.uploadFile = async (req, res) => {
  res.status(200).json({ success: true, uploadedFiles: req.fileUrls });
};
