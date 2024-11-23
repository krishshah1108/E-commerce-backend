import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
}); 

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["jpg", "jpeg", "png"];
    if (allowedFileTypes.includes(file.mimetype.split("/")[1])) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type."), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});

export default upload;
