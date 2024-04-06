
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { pdfjs } from 'react-pdf';
import PdfComp from './pdfComp';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
function App() {
  
const [title,setTitle]= useState("");
const [file,setFile]= useState("");
const [allImages,setAllImages]= useState([]);
const [pdfFile, setpdfFile] = useState(null);
useEffect(()=>{
  getPdf();
},[])
const getPdf= async ()=>{
  const result = await axios.get("http://localhost:5000/get-files");
  console.log(result.data.data);
  setAllImages(result.data.data)
  
}
const submitPdf= async (e)=>{
  e.preventDefault();
  const formData= new FormData();
  formData.append('title',title);
  formData.append("file",file);
  console.log(formData);
  console.log(file,title);
  const result = await axios.post("http://localhost:5000/upload-files",formData,{
    headers:{
      "Content-Type":"multipart/form-data"
    }
  })
  console.log(result)
  if(result.data.status==="ok"){
    alert("uploaded Successfully");
    getPdf();
  }
}
const showPdf=(pdf)=>{
  //  window.open(`http://localhost:5000/files/${pdf}`,"_blank","noreferrer")
   setpdfFile(`http://localhost:5000/files/${pdf}`)
}
  return (
    <>
    <div className="App">
      <form action="" className="formStyle" onSubmit={submitPdf}>
         <h2>PDF Uploader  </h2>
         <input type="text" className='form-control' placeholder='title' required
          onChange={(e)=> setTitle(e.target.value)}
         />
         <br />
         <input type='file' className='form-control' accept='application/pdf'required
          onChange={(e)=> setFile(e.target.files[0])}
         />
         <br />
         <button className='btn btn-primary' type='submit'>
          Submit 
         </button>
      </form>
      <div className='uploaded'>
       <h4>Uploaded PDF: </h4>
       <div className="output-div">
        {allImages && allImages.map(data=>{
          return (
            <div className="inner-pdf">
            <h6>Titile : {data.title}</h6>
            <button className='btn btn-primary'
            onClick={()=>{
              showPdf(data.pdf)
            }}
            >Show Pdf</button>
          </div>
          )
        })}
       </div>
      </div>
      <PdfComp pdfFile={pdfFile} />
    </div>
    </>
  )
}

export default App
