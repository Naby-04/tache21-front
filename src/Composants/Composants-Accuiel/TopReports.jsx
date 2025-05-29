// TopReports.jsx (publique)
import React, { useEffect, useState } from 'react';
import ReportCard from './ReportCard';
import { Link } from 'react-router-dom';
import { usePublication } from '../../Contexts/DashboardUser/UseContext';

function TopReports() {
  const [topRapports, setTopRapports] = useState([]);
  const { url } = usePublication();

  useEffect(() => {
    const fetchTopRapports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${url}/api/comments/top/commented`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        // On récupère juste les rapports
        const rapportsAvecCommentaires = data.map(item => ({
          ...item.rapport,
          totalComments: item.totalComments
        }));
        setTopRapports(rapportsAvecCommentaires);
      } catch (error) {
        console.error("Erreur lors du chargement des top rapports :", error);
      }
    };

    fetchTopRapports();
  }, [url]);

  console.log(topRapports)

  return (
    <section id="rapports" className="p-10 bg-white">
      <div className="flex justify-center mb-8">
        <h2 className="relative text-2xl font-bold text-gray-800 after:content-[''] after:block after:h-[3px] after:w-[50%] after:mx-auto after:bg-amber-300 after:mt-2">
          Top rapports
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topRapports.slice(0,3).map((report) => (
          <ReportCard key={report._id} report={report} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to="/rapports"
          className="px-4 py-2 bg-gray-800 text-white hover:bg-amber-300 hover:text-gray-800 transition duration-100 cursor-pointer text-md rounded-full text-center"
        >
          Découvrir Plus
        </Link>
      </div>
    </section>
  );
}

export default TopReports;
