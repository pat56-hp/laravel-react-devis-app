import { useContext } from "react";
import { createContext, useState } from "react";

//Creation des elements de connexion par defaut
const StateContext = createContext({
    user : null,
    token : null,
    setUser: () => {},
    setToken: () => {},
})

export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

    //Verification de l'existence du token
    const setToken = (token) => {
        _setToken(token)

        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)