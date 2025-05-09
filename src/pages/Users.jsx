import TableUser from "../Composants/composants de la page admin/TableUser";
// import avatar from "../assets/avatar.jpg"

const Users = ({lesUtilisateurs}) => {

    return ( 
        <div className="p-1">
            <TableUser tabUsers={lesUtilisateurs} />
        </div>
     );
}
 
export default Users;

/*
const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredUsers(users); // Si le champ est vide, on affiche tous les utilisateurs
    } else {
      const filtered = users.filter(user =>
        user.nomUsers.toLowerCase().includes(term.toLowerCase()) // Filtre sur le nom de l'utilisateur
      );
      setFilteredUsers(filtered);
    }
  };
  */