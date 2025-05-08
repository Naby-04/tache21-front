import { FaCloudUploadAlt, FaComment, FaEye } from "react-icons/fa";

export const Acceuil = () => {
    return <div className="p-2 text-[var(--primary-color)] w-full lg:w-[50%] flex flex-col gap-5">
        <div className="document  w-full shadow-2xl p-5 lg:p-10 bg-white">
            
        <h1 className="text-2xl font-bold">Titre du Documents</h1>
        <div className="pdf p-2 lg:p-10 bg-white" >
            <img src="/imge/back.jpeg" alt=""className="max-h-[300px] w-full object-fit: cover" />
        </div>
        <div className="description">
            <p>cette photo reflete une histoire d'un famille senegalaise</p>
        </div>
        <div className="flex justify-around lg:justify-between items-center gap-2 mt-4 p-4">
        <p className="flex gap-2 items-center justify-center cursor-pointer text-2xl"><FaComment /> <span className="hidden lg:block text-[12px]">Commenter</span></p>
        <p className="flex gap-2 items-center justify-center cursor-pointer text-2xl"><FaEye /><span className="hidden lg:block text-[12px]">Voir Commentaires</span></p>
        <p className="flex gap-2 items-center justify-center cursor-pointer text-2xl"><FaCloudUploadAlt /> <span className="hidden lg:block text-[12px]">Telecharger</span></p>
        </div>
        
        </div>
        <div className="document w-full shadow-2xl p-2 lg:p-5 bg-white">
        <h1 className="text-2xl font-bold">Titre du Documents</h1>
        <div className="pdf p-2 lg:p-10" >
            <img src="/imge/back.jpeg" alt=""className="h-[300px] w-full object-fit: cover" />
        </div>
        <div className="description">
            <p>cette photo reflete une histoire d'un famille senegalaise</p>
        </div>
        <div className="flex justify-around lg:justify-between items-center gap-2 mt-4 p-4">
        <p className="flex gap-2 items-center justify-center cursor-pointer "><FaComment /> <span className="hidden lg:block text-[12px]">Commenter</span></p>
        <p className="flex gap-2 items-center justify-center cursor-pointer text-xl"><FaEye /><span className="hidden lg:block text-[12px]">Voir Commentaires</span></p>
        <p className="flex gap-2 items-center justify-center cursor-pointer text-xl"><FaCloudUploadAlt /> <span className="hidden lg:block text-[12px]">Telecharger</span></p>
        </div>
        </div>
        <div className="document  w-full shadow-2xl p-2 lg:p-5 bg-white">
        <h1 className="text-2xl font-bold">Titre du Documents</h1>
        <div className="pdf p-2 lg:p-10" >
            <img src="/imge/back.jpeg" alt=""className="h-[300px] w-full object-fit: cover" />
        </div>
        <div className="description">
            <p>cette photo reflete une histoire d'un famille senegalaise</p>
        </div>
        <div className="flex justify-around lg:justify-between items-center gap-2 mt-4 p-4">
        <p className="flex gap-2 items-center justify-center cursor-pointer text-2xl"><FaComment /> <span className="hidden lg:block text-[12px]">Commenter</span></p>
        <p className="flex gap-2 items-center justify-center cursor-pointer text-2xl"><FaEye /><span className="hidden lg:block text-[12px]">Voir Commentaires</span></p>
        <p className="flex gap-2 items-center justify-center cursor-pointer text-2xl"><FaCloudUploadAlt /> <span className="hidden lg:block text-[12px]">Telecharger</span></p>
        </div>
        </div>
    </div>;
}