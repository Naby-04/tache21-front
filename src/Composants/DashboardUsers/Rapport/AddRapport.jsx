import { Link } from "react-router-dom";

export const AddRapport = ({style}) => {
    return <Link to="/publicationRapport" style={style}
    className="p-2  text-xs rounded-3xl hover:opacity-80"
>
    Ajouter un rapport
</Link>;
}