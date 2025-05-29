import { Link } from "react-router-dom";

export const AddRapport = () => {
    return <Link to="/users/publicationRapport"
    className="ml-4 px-4 py-2 bg-amber-400 text-white rounded-full hover:bg-amber-500 transition"
>
    Ajouter un rapport
</Link>;
}