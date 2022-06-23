import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MordOSContext } from "../components/StoreProvider";


export function useAuthGuard() {
    const { authenticatedUser } = useContext(MordOSContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!authenticatedUser) {
            navigate("../login", { replace: true })
        }
    }, [authenticatedUser])

    return authenticatedUser
}