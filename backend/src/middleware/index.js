const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const savedImagePath = Date.now() + "-" + file.originalname;
        req.body.profilePhoto = savedImagePath;
        cb(null, savedImagePath);
    },
});

export const upload = multer({ storage });
