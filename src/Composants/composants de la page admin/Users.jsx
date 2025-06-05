import TableUser from "./TableUser";

const Users = ({lesUtilisateurs, onDelete}) => {

    return ( 
        <div className="p-1">
            <TableUser tabUsers={lesUtilisateurs} onDelete={onDelete} />
        </div>
     );
}
 
export default Users;