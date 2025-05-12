// import { Avatar } from "@mui/material";
// import avatar from "../../assets/avatar.jpg"
import { FaFilePdf } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import imagePdf from "../../assets/imagePdf.png"
// import Pdf from "../../assets/pdf.jpeg"



const DetailRapportAdmin = ({rapportChoisi, onClick}) => {
    if(!rapportChoisi) return null
    return ( 
        <div className="flex justify-between gap-2 shadow rounded bg-white p-3 pt-5 relative">
            <div className="flex items-center absolute top-1 left-1 justify-center p-1 px-2 rounded-lg bg-gray-800 gap-2 text-amber-300 cursor-pointer z-5" onClick={onClick}>
                <BiArrowBack />
            </div>
            <div className="basis-2/3 w-full flex flex-col gap-2">
             <div className="flex gap-2 items-center border-b border-gray-800 pb-3">
                <div className="w-15 h-15 rounded-full relative bg-amber-200">
                    <img
                       src={rapportChoisi.userPhoto}
                        alt=""
                        className="absolute w-full h-full object-cover rounded-full"
                    />
                </div>
                <div>
                    <p className="text-md font-medium">{rapportChoisi.nomUsers}</p>
                    <p className="text-sm text-gray-600">{rapportChoisi.categories}</p>
                </div>
             </div>
             <div className="mt-1 py-2 px-2">
                <p className="text-xl font-bold"> - {rapportChoisi.titre}</p>
                <p className="text-md mt-3">{rapportChoisi.descriptionLong}
                </p>
                <div className="py-2 mt-3 px-2">
                    <div className="flex gap-2 mb-2">
                        <p className="text-md font-semibold underline">Catégories :</p>
                        <p className="text-md font-light">{rapportChoisi.categories}</p>
                    </div>
                    <div className="flex gap-2 mb-2">
                        <p className="text-md font-semibold underline">Tags :</p>
                        <p className="text-md font-light">Python, Js, Developpemnet Web</p>
                    </div>
                    <div className="flex gap-2 mb-2">
                        <p className="text-md font-semibold underline">Type :</p>
                        <p className="text-md font-light">pdf</p>
                    </div>
                </div>
                <div className="flex mt-2 gap-3 py-2 px-2">
                    <div className="flex items-center justify-center gap-2 p-3 px-6 rounded-lg bg-gray-800 text-amber-300 cursor-pointer">
                        <FaFilePdf />
                        <span className="text-md">Voir Pdf</span>
                    </div>
                    <div className="flex items-center justify-center p-3 px-6 rounded-lg bg-gray-800 gap-2 text-amber-300 cursor-pointer">
                        <FaDownload />
                        <span className="text-md">Download</span>
                    </div>
                </div>
             </div>
            </div>
            <div className="basis-1/3 w-full p-2 flex items-center justify-center">
                <div className="relative rounded border border-gray-800 shadow-lg">
                    <img src={imagePdf} alt="" className="border rounded" />
                    <img src={rapportChoisi.imageRapport} alt="" className="absolute z-2 w-10 h-10 rounded-3xl object-cover border bg-gray-800 bottom-2 right-2" />
                </div>
            </div>
        </div>
     );
}
 
export default DetailRapportAdmin;