import { useContext, createContext, useState, useEffect,useRef} from "react";

const Authcontext = createContext();

const AuthProvider = ({ children }) => {
    const socketRef = useRef(null);
    const [initial, setInitial] = useState(() => {
        return sessionStorage.getItem("isLoggedIn") === "true";
    });
    useEffect(() => {
        sessionStorage.setItem("isLoggedIn", initial);
    }, [initial]);
    return (
        <Authcontext.Provider value={{ initial, setInitial,socketRef}}>
            {children}
        </Authcontext.Provider>
    )
}
const useAuth = () => useContext(Authcontext);
export { useAuth, AuthProvider };