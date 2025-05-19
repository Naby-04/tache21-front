import "./Viewpdf.css"
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useState } from "react";


export const ViewPdf = () => {
    const [pdfFile, setpdfFile] = useState(null)
    const [viewPdf,setViewPdf] = useState(null)

    const fileType = ["application/pdf"]
    const handleFileChange = (event) => {
        let selectedfile = event.target.files[0];
        if (selectedfile) {
            if (selectedfile && fileType.includes(selectedfile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedfile);
                reader.onload = (e) => {
                    setpdfFile(e.target.result);
                };
            } else {
                setpdfFile(null);
            }
        }else{
            alert("Please select only pdf file.");
        }
    };
      
    const newPlugin = defaultLayoutPlugin();

    const handleViewPdf = (e) => {
        e.preventDefault()
        if(pdfFile !== null) {
         setViewPdf(pdfFile)
        }else{
            setViewPdf(null)
        }
    }
    return <div className="viewPdf w-full flex items-center justify-center h-screen">
        <form action=""  className="flex items-center flex-col gap-2" onSubmit={handleViewPdf}>
            <input type="file" name="file" className="border "   onChange={handleFileChange}/>
            <button className="bg-gray-500 cursor-pointer text-white" 
            onChange={handleViewPdf}>
                View</button>
        </form>

        <div className="container">
            <h2>view Pdf</h2>
            <div className="pdf-container">
               <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
               <div
                style={{
                    height: '750px',
                    width: '900px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
                >
               {viewPdf && <Viewer fileUrl={viewPdf} plugins={[newPlugin]}/>}

               {!viewPdf && <p>pdf not found</p>}
               </div>
               </Worker>
            </div>
        </div>



    </div>;
}