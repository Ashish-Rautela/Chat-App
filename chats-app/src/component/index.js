import { Navigate } from "react-router-dom";
import { useAuth } from "../context_rout";
export const PrivateRoute =({children})=>{
    const {initial} = useAuth();
    return initial?children:<Navigate to="/login"/>
}