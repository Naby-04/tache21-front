import { RapportCardAccueil } from "./RapportCardAccueil";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";





      
 
export const RapportsPages = ({ searchTerm , activeCategory }) => {
   const[getRapport, setGetRapport] = useState([]);
   const [loading, setLoading] = useState(true);

   

     const {url} =usePublication()
        // console.log(url);

   useEffect(()=>{
        const getPublications = async ()=>{
            try{ 
                const response = await fetch(`${url}/rapport/all`)
                 
                const data = await response.json()
                console.log('Publication:',data)

                setGetRapport(data)
                // console.log(data)
            }catch(err){
                console.error('Erreur fetching', err)
            }finally {
              setLoading(false); 
            }
        }
        getPublications()
      },[])
      // console.log(getRapport);
  

const filteredDocs = getRapport.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? doc.category === activeCategory : true;
    return matchesSearch && matchesCategory;
    });

    return <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
      {loading ? (
      <div className="col-span-full flex flex-col items-center justify-center mt-10">
        <ClipLoader color="#36d7b7" size={40} />
        <p className="text-gray-600 mt-4">Chargement des rapports...</p>
      </div>
    ) : filteredDocs.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 text-lg mt-10">
          Aucun rapport trouvé {activeCategory && `pour la catégorie "${activeCategory}"`}
          {searchTerm && !activeCategory && ` correspondant à "${searchTerm}"`}
          {searchTerm && activeCategory && ` pour "${searchTerm}" dans "${activeCategory}"`}
        </div>
      ) : (
        filteredDocs.map((doc) => (
          <RapportCardAccueil key={doc.id} doc={doc} />
        ))
      )}
  
</div>
        
        
}

