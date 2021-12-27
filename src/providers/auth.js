import React, { useState } from 'react';

export const authContext = React.createContext({  });

export const AuthProvider = (props) => {
    const [user, setUser] = useState({
        name: '' || localStorage.getItem("name"),
        email: '' || localStorage.getItem("email"),
        token: '' || localStorage.getItem("token")
    });

    return (
        <authContext.Provider value={{ user, setUser }}>
            {props.children}
        </authContext.Provider>
    );
}