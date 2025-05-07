import StatsBox from "../Composants/composants de la page admin/StatsBox";
import { LuUsers } from "react-icons/lu";
import { BsFillFileTextFill } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";


const Dashboard = () => {
    return ( 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border border-gray-300 rounded shadow-md">
            <StatsBox titre="Utilisateurs" valeur="150" icone={<LuUsers />} />
            <StatsBox titre="Rapports" valeur="800" icone={<BsFillFileTextFill />} />
            <StatsBox titre="Rapports Télécharger" valeur="450" icone={<FaFileDownload />} />
            <StatsBox titre="Top Téléchargement" valeur="75" icone={<FaDownload />} />
        </div>
     );
}
 
export default Dashboard;