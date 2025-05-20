// import React, { createContext, useContext, useState } from 'react';

// const FormContext = createContext();
// export const FormProvider = ({ children }) => {
//     const [userInfo, setUserInfo] = useState({
//         name: '',
//         email: '',
//         passwoerd: '',
//         confirmPassword: '',
//     });

//     return (
//         <FormContext.Provider value={{ userInfo, setUserInfo }}>
//             {children}
//         </FormContext.Provider>
//     );
// };

// export const useFormContext = () => useContext(FormContext);