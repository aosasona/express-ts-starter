// Multer file uploader helper
// Language: typescript

import multer from "multer";
import path from "path";
import type { StorageEngine } from "multer";

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },

  // fileFilter: (req, file, cb) => {
  //     // reject a file
  //     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  //         cb(null, true);
  //     } else {
  //         cb(null, false);
  //     }
  // }
});

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
