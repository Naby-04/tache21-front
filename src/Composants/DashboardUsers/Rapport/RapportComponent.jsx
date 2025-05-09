
export const ComponentRapport = ({img,tite,children,view,supp,modif,iconbtn3,user,iconbnt1,iconbtn2,date}) => {
    return <div className="p-4 text-[var(--text-couleur)] bg-[var(--background-color)] min-w-[300px] min-h-[200px]
     flex-auto flex justify-center items-center composantRapport">
        <div className="flex gap-4 w-full bg-[#f2f2f2] p-2">
            <div className="image flex-auto ">
                <img src={img} alt="pdf rapport" className="max-w-[50px] object-cover h-full md:w-[200px]"/>
            </div>

            <div>
               <div className="contenu">
 
                <h1>{tite}</h1>
                <div>Par : <span className="font-light text-[12px]">{user}</span></div>
                <div>Date : <span className="font-light text-[10px]">{date}</span></div>
                <div className="text-sm line-clamp-2">{children}</div>
               </div>

               <div className="action_button">
                <button className=" flex gap-2 items-center justify-center">
                   <span className="hidden md:block">{view}</span>  {iconbnt1} 
                    </button> 
                <button className='flex gap-2 items-center justify-center'>
                   <span className="hidden md:block">{supp}</span>{iconbtn2}
                </button>
                <button className='flex gap-2 items-center justify-center'>
                   <span className="hidden md:block">{modif}</span> {iconbtn3}
                </button>
               </div>

            </div>
        </div>
      </div>
   
}

