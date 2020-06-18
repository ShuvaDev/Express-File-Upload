let express = require('express')
let chalk = require('chalk')
let upload = require('./middleware/upload')

let app = express()
app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
    res.render('fileUpload')
})

app.post('/',upload.single('my-file') ,(req, res, next) => {
    if(req.file) {
        res.json({
            message: `File Upload in ${req.file.path}`
        })
    } else {
        res.json({
            message: `File Uploaded Failed`
        })
    }
})

app.use((req, res, next) => {
    res.json({
        message: '404 Not Found'
    })
})

app.use((error, req, res, next) => {
    res.json({
        message: error.message
    })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(chalk.green.inverse(`Server is running on PORT ${PORT}`))
})