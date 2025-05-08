import React from "react";
import { MdMode } from "react-icons/md";

const TableUser = ({tabUsers}) => {
  return <div className="overflow-x-auto">
    <table className="min-w-full rounded border-[var(--primary-color)] border-1 border-gray-400">
      <thead>
        <tr className="text-left text-sm uppercase bg-[var(--primary-color)] text-white shadow">
          <th className="py-2 px-3 text-center text-sm font-bold">Prenom Nom</th>
          <th className="py-2 px-3 text-center text-sm font-bold">Email</th>
          <th className="py-2 px-3 text-center text-sm font-bold">Role</th>
          <th className="py-2 px-3 text-center text-sm font-bold">Date d'inscription</th>
          <th className="py-2 px-3 text-center text-sm font-bold">Action</th>
        </tr>
      </thead>
      <tbody>
        {
      tabUsers.length === 0 ? 
        <tr>
          <td className="py-3 px-4 text-center">Pas d'utilisateur</td>
        </tr> 
        : 
          tabUsers.map((element) => (
            <tr className="border-b-1 cursor-pointer hover:bg-gray-100 mt-5 shadow hover:text-[var(--primary-color)]">
            <td className="py-3 px-4 text-center text-sm">{element.name}</td>
            <td className="py-3 px-4 text-center text-sm">{element.email}</td>
            <td className="py-3 px-4 text-center text-sm">{element.role}</td>
            <td className="py-3 px-4 text-center text-sm">{element.jourInscripte}</td>
            <td className="py-3 px-4 text-center text-sm flex gap-4 justify-center">
              <button className="text-sm px-2 py-1 shadow rounded bg-[var(--primary-color)] text-gray-200"><MdMode /></button>
              <button className="text-sm text-white px-2 py-1 rounded shadow bg-red-600">X</button>
            </td>
          </tr>
          ))
      }
      </tbody>
    </table>
  </div>;
};

export default TableUser;





/*
import React from 'react';

const TableUser = ({ users, onView, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
            <th className="py-3 px-4">Nom</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Rôle</th>
            <th className="py-3 px-4">Date d'inscription</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">{user.registeredAt}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => onView(user)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Voir
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
*/