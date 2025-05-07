export const Profile = () => {
    return <div className="profile text-white ">
            <div className="img-profil mt-4">
             <img src={"https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}
              alt="profil" className="w-[100px] h-[100px] rounded-full"/>
            </div>
            <div className="infos-profil text-[var(--primary-color)] mt-4">
                <p className="name text-2xl font-bold">John Doe</p>
                <p className="description">je suis un utilisateur</p>
            </div>
        </div>

}