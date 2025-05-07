import TableUser from "../Composants/composants de la page admin/TableUser";

const lesUtilisateurs = [
    {
        id: 1,
        name: 'Abdoul Wakhab',
        email: 'planimportant@gmail.com',
        role: 'admin',
        jourInscripte: '2024-12-01',
    },
    {
        id: 2,
        name: 'Ndeye Amy Thiam',
        email: 'thiam@gmail.com',
        role: 'utilisateur',
        jourInscripte: '2024-13-21',
    },
    {
        id: 3,
        name: 'Naby Dev',
        email: 'dev^@gmail.com',
        role: 'admin',
        jourInscripte: '2025-02-05',
    },
    {
        id: 4,
        name: 'Nafissatou',
        email: 'badji@gmail.com',
        role: 'utilisateur',
        jourInscripte: '2022-02-11',
    },
    {
        id: 5,
        name: 'Baba',
        email: 'faye@gmail.com',
        role: 'admin',
        jourInscripte: '2021-10-11',
    },
    {
        id: 6,
        name: 'Binta Dia',
        email: 'binta@gmail.com',
        role: 'admin',
        jourInscripte: '2021-02-13',
    },
    {
        id: 7,
        name: 'Hamidou',
        email: 'lyham@gmail.com',
        role: 'utilisateur',
        jourInscripte: '2025-01-16',
    },
]

const Users = () => {
    return ( 
        <div className="p-1">
            <h6 className="text-2xl font-semibold mb-4 text-start">Liste des Utilisateur</h6>
            <TableUser tabUsers={lesUtilisateurs} />
        </div>
     );
}
 
export default Users;