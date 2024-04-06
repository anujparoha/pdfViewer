const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors= require('cors');
app.use(cors());
app.use("/files", express.static("files"));
const mongoUrl ="mongodb+srv://anuj:anuj@cluster0.kr1oxzx.mongodb.net/pdfUploader"

mongoose.connect(mongoUrl).then(()=>{
    console.log("Connected to database ");
}).catch((e)=>{
    console.log(e);
})

// multer code 
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' +file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  require("./pdfDetails");
  const PdfSchema= mongoose.model("PdfDetails");

app.post("/upload-files",upload.single("file"),async(req,res)=>{
   console.log(req.file);
   const title= req.body.title;
   const fileName= req.file.filename;
  try{
    await PdfSchema.create({title,pdf:fileName});
    res.send({status:"ok"})
  }
  catch(e){
    res.json({status:"error"})
  }

})
app.get("/get-files", async (req, res) => {
    try {
        const data = await PdfSchema.find({}).collation({ locale: 'simple' });       
         res.send({ status: "ok", data: data });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", message: "Failed to retrieve data" });
    }
});

app.listen(5000,()=>{
    console.log("sever Started ");
})