import { RapportCardAccueil } from "./RapportCardAccueil";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { useEffect, useState } from "react";

      
 
export const RapportsPages = ({ searchTerm }) => {
   const[getRapport, setGetRapport] = useState([]);

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
            }
        }
        getPublications()
      },[])
      // console.log(getRapport);
  

const filteredDocs = getRapport.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

    return <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
     {filteredDocs.map((doc) => (
        <RapportCardAccueil key={doc.id} doc={doc} />
      ))}
</div>
        
        
}

