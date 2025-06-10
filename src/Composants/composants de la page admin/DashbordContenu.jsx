import StatsBox from "./StatsBox";
import TopRapports from "./TopRapports";

import { LuUsers } from "react-icons/lu";
import { BsFillFileTextFill } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

import Image from "../../assets/back1.jpg";
import Image2 from "../../assets/back2.jpg";
import Image3 from "../../assets/back3.jpg";
import Image4 from "../../assets/back4.jpg";
import BasicPie from "./Diagramme";

const DashboardContenu = ({ rapports, onDelete, utilisateurs, topRapports, telechargement, setVueActive }) => {

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 p-3">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatsBox
            titre="Utilisateurs"
            image={Image}
            icone={<LuUsers />}
            valeur={utilisateurs.length}
            onClick={() => setVueActive("users")}
          />
          <StatsBox
            titre="Rapports"
            image={Image2}
            icone={<BsFillFileTextFill />}
            valeur={rapports.length}
            onClick={() => setVueActive("rapports")}
          />
          <StatsBox
            titre="Telechargement"
            image={Image3}
            icone={<FaFileDownload />}
            valeur={telechargement.length}
          />
          <StatsBox
            titre="Top Rapports"
            image={Image4}
            icone={<FaDownload />}
            valeur={topRapports.length}
          />
        </div>
        <div className="w-full lg:w-1/3 flex-shrink-0">
          <div className="bg-white p-6 rounded shadow h-full">
            <p className="text-gray-600 text-sm mb-3">Diagrammes</p>
            <h3 className="text-lg font-semibold mb-4">Les Statistiques</h3>
            <BasicPie 
              utilisateursCompte={utilisateurs.length}
              rapportsCompte={rapports.length}
              topRapportsCompte={topRapports.length}
              telechargeCompte={telechargement.length}
             />
          </div>
        </div>
      </div>
      <div className="p-3 w-full">
        <TopRapports
          rapports={topRapports.map(item => ({
            ...item.rapport,
            totalComments: item.totalComments
          }))}
          onDeleteClick={onDelete}
        />

      </div>
    </div>
  );
};

export default DashboardContenu;