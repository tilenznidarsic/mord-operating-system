import { useState, useEffect, useContext } from "react";
import { MordOSContext } from "../components/StoreProvider";
import { User } from "../types/User.type"
import { LS_USERS_KEY } from "../constants";


export default function useUsers() {
    const sortUsersByAuth = (users: Array<User>) => {
        return users.sort((a: User, b: User) => a.name === authenticatedUser.name ? -1 : 1)
    }
    
    const { authenticatedUser } = useContext(MordOSContext)
    const [users, setUsers] = useState<Array<User>>(sortUsersByAuth(JSON.parse(localStorage.getItem(LS_USERS_KEY) || "[]")))
    
    const itemInsertedHandler = () => {
        if (authenticatedUser) {
            setUsers(sortUsersByAuth(JSON.parse(localStorage.getItem(LS_USERS_KEY) || "[]")))
        }
    }

    useEffect(() => {
        document.addEventListener("itemInserted", itemInsertedHandler)

        return () => document.removeEventListener("itemInserted", itemInsertedHandler)
    }, [])

    return { users, authenticatedUser }
}

