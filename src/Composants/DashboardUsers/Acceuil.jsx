import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { RapportCard } from "./Rapport/RapportCards";
import fakeReports from "../../data/FakeReport";
import { useEffect } from "react";
// Test

export const Acceuil = () => {
  const {setPublications,filteredPublicationsBySearch,url}= usePublication()
  useEffect(() => {
 const getPublications = async () => {
    try {
      const response = await fetch(`${url}/rapport/getAll`);
      const data = await response.json();
      console.log("Publications:", data);
      
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
      {/* <div className="titles mb-10">
        <h1 className="mt-5 md:mt-0 text-center text-3xl font-[var(--font-title)]">Les derniers Rapports publiés</h1>
      </div> */}
      {sortedPublications.length === 0 ? (
        <p className="text-sm text-gray-500">Aucun rapport publié pour cette categorie.</p>
      ) : (
        sortedPublications.map((doc,i)=>(<RapportCard key={i} doc={doc} />))
      )}
</div>
        
        
}