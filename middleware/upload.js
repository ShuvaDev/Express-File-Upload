let multer = require('multer')
let path = require('path')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + file.originalname)
    }
})

let upload = multer({
    storage: storage,
    limits: {
        // Set max file size 1MB
        fileSize: 1000 * 1024 * 1
    },
    fileFilter: (req, file, cb) => {
        let types = /jpeg|jpg|png|gif/
        let extName = types.test(path.extname(file.originalname))
        let mimetype = types.test(file.mimetype)

        if(extName && mimetype) {
            cb(null, true)
        } else {
            cb(new Error('You can upload only jpeg, jpg, png and gif file.'))
        }
    }
})

module.exports = upload