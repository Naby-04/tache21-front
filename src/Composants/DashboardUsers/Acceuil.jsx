import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { RapportCard } from "./Rapport/RapportCards";
import { useEffect } from "react";
// Test

export const Acceuil = () => {
  const token = localStorage.getItem("token");
  
  const {setPublications,filteredPublicationsBySearch,url}= usePublication()
  useEffect(() => {
 const getPublications = async () => {
    try {
      const response = await fetch(`${url}/rapport/all`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      
      const data = await response.json();
      // console.log("Publications:", data);
      
      setPublications(data);
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  };

  if (filteredPublicationsBySearch.length === 0) {
    getPublications();
 }
  }, []);


  
  
  const sortedPublications = filteredPublicationsBySearch.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return <div className="py-6 px-4 flex flex-col items-center">
      <div className="titles mb-10 w-full">
        <h1 className="mt-5 md:mt-0 text-start text-3xl font-[var(--font-title)]">Les derniers Rapports publiés</h1>
      </div>
      {sortedPublications.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-500">Aucun rapport publié pour cette recherche</p>
           <img src="/images/undraw_my-files_yynz.svg" alt="empty state" />

        </div>
      ) : (
        sortedPublications.map((doc,i)=>(<RapportCard key={i} doc={doc} />))
      )}
</div>
        
        
}