const mongoose = require('mongoose');
const pdfDetailsSchema= new mongoose.Schema({
    pdf:String,
    title:String,
},{
    collation:"PdfDetails"
})
mongoose.model('PdfDetails', pdfDetailsSchema)