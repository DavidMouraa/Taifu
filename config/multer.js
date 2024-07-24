const multer = require("multer")
const path = require("path")
const fs = require("fs")

const productImgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `${process.cwd()}/public/images/products`

        fs.mkdirSync(dir, {recursive: true})
        
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        let baseName = req.body.desc
        const timestamp = Date.now()
        const originalName = file.originalname
        const ext = path.extname(originalName)

        switch(file.fieldname) {
            case "smallImage": 
                baseName = `${baseName}-small`
            break
            case "largeImage": 
                baseName = `${baseName}-large`
            break
        }
        
        cb(null, `${baseName}-${timestamp}${ext}`)
    }
})

const productImgUpload = multer({ storage: productImgStorage })

module.exports = {
    productImgUpload
}
