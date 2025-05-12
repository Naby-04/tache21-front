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