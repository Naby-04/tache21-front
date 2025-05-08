export const RapportTelecharger = () => {

    const Telecharger= [
        {
            id: "doc1",
            title: "Mémoire sur le climat",
              img: "../../../public/images/dev.jpg"
        },
        {
            id: "doc1",
            title: "Mémoire sur le climat",
              img: "../../../public/images/dev.jpg"
        },
        {
            id: "doc1",
            title: "Mémoire sur le climat",
              img: "../../../public/images/dev.jpg"
        },
    ]
        
       
    return <div>
        <h1>Mes Rapports Telecharges</h1>

      <div className="flex flex-col gap-5 p-3">
        <div className="p-2">
        {Telecharger.map((doc)=><div key={doc.id} className="document  w-full shadow-2xl p-5 lg:p-10 bg-white">
            <div className="infos-owner">
            <div className="profil-owner flex items-center gap-2">
                    <img src={doc.img} alt="" className="w-[40px] h-[40px] rounded-full"/>
                    <div className="flex flex-col ">
                    <strong>John Doe</strong>
                    <small>il y' a 2 minutes</small>

                    </div>
                </div>
            </div>
            <h1 className="text-xl font-bold ml-5 mt-3">{doc.title}</h1>
            <div className="pdf p-2 lg:p-5 bg-white">
                <img src={doc.img} alt=""className="max-h-[300px] w-full object-fit: cover" />
            </div>
            
            <div className="description">
                <TextExpandable >
                  {doc.description}
                </TextExpandable>
            </div>
        </div>)}
        </div>

      </div>
        
    </div>;
}