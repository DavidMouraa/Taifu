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
        let baseName = req.body.slug
        const originalName = file.originalname
        const ext = path.extname(originalName)

        switch(file.fieldname) {
            case "smallImg": 
                baseName = `${baseName}-small`
            break
            case "largeImg":
                baseName = `${baseName}-large`
            break
        }
        
        cb(null, `${baseName}${ext}`)
    }
})

const productImgUpload = multer({ storage: productImgStorage })

module.exports = {
    productImgUpload
}
