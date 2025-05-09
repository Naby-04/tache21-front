export const Profile = () => {
    return <div className="profile text-white flex items-center gap-3 md:block">
            <div className="img-profil mt-4">
             <img src={"https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}
              alt="profil" className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] rounded-full"/>
            </div>
            <div className="infos-profil text-[var(--text-couleur)] mt-4">
                <p className="name text-sm text-[#fff] md:text-[#212121] md:text-lg font-regular">John Doe</p>
                <p className="description text-sm hidden md:block text-gray-500">je suis un utilisateur</p>
            </div>
        </div>

}