import React, { useContext } from "react"
import { LS_USERS_KEY } from "../constants"
import { MordOSContext } from "./StoreProvider"
import { useNavigate } from "react-router-dom"


type User = {
    name: string,
    password: string
}

export default function LoginPage(): React.ReactElement {
    const { setAuthenticatedUser } = useContext(MordOSContext)
    const navigate = useNavigate()
    
    const handleLogin = (e: any) => {
        e.preventDefault()

        const usersDB = JSON.parse(localStorage.getItem(LS_USERS_KEY) || "{}")
        const username = (document.getElementById("username-input") as HTMLInputElement).value
        const password = (document.getElementById("password-input") as HTMLInputElement).value
        const userFromDB = usersDB.find((user: User) => user.name === username)

        if (userFromDB && userFromDB.password === password) {
            setAuthenticatedUser(userFromDB)
            navigate("../os", { replace: true })
        }
        else {
            window.alert("LOGIN FALSE")
        }
    }

    return (
        <div className="login-page">
            <form>
                <input type="text" placeholder="username" id="username-input" />
                <input type="password" placeholder="password" id="password-input" />
                <input type="submit" onClick={handleLogin} />
            </form>
        </div>
    )
}