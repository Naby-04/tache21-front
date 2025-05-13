import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { RapportCard } from "./Rapport/RapportCards";
import fakeReports from "../../data/FakeReport";
// Test

export const Acceuil = () => {
  const {publications,filteredPublications}= usePublication()

    return <div className="py-6 px-4 flex flex-col items-center">
      <div className="titles mb-10">
        <h1 className="text-3xl font-[var(--font-title)]">Les dernieres Rapports publiés</h1>
      </div>
      {fakeReports.length === 0 ? (
        <p className="text-sm text-gray-500">Aucun rapport publié pour cette categorie.</p>
      ) : (
        fakeReports.map((doc) => <RapportCard key={doc.id} doc={doc} />)
      )}
</div>
        
        
}