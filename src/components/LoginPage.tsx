import React, { useContext } from "react"
import { LS_USERS_KEY } from "../constants"
import { MordOSContext } from "./StoreProvider"
import { useNavigate } from "react-router-dom"
import CryptoJS from 'crypto-js';
import { User } from "../types/User.type"
import { useParallax } from "../customHooks/useParallax";


export default function LoginPage(): React.ReactElement {
    const { setAuthenticatedUser } = useContext(MordOSContext)
    const navigate = useNavigate()

    useParallax({
        parallaxItems: [
            {
                id: "logo-letter-M",
                maxDistance: 30
            },
            {
                id: "logo-letter-O",
                maxDistance: 30,
                reverse: true
            },
            {
                id: "logo-letter-R",
                maxDistance: 30
            },
            {
                id: "logo-letter-D",
                maxDistance: 30,
                reverse: true
            },
            {
                id: "logo-letter-O2",
                maxDistance: 30
            },
            {
                id: "logo-letter-S",
                maxDistance: 30,
                reverse: true
            },
        ]
    })

    const handleLogin = (e: any) => {
        e.preventDefault()

        const usersDB = JSON.parse(localStorage.getItem(LS_USERS_KEY) || "{}")
        const username = (document.getElementById("username-input") as HTMLInputElement).value
        const password = (document.getElementById("password-input") as HTMLInputElement).value
        const userFromDB = usersDB.find((user: User) => user.name === username)

        if (userFromDB && userFromDB.password === CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)) {
            setAuthenticatedUser(userFromDB)
            navigate("../os", { replace: true })
        }
        else {
            window.alert("LOGIN FALSE")
        }
    }

    return (
        <div className="login-page">
            <div className="parallax-logo">
                <h1 className="logo-letter" style={{ left: "10%" }} id="logo-letter-M">M</h1>
                <h1 className="logo-letter" style={{ left: "25%" }} id="logo-letter-O">O</h1>
                <h1 className="logo-letter" style={{ left: "40%" }} id="logo-letter-R">R</h1>
                <h1 className="logo-letter"  style={{ left: "55%" }} id="logo-letter-D">D</h1>
                <h1 className="logo-letter" style={{ left: "70%" }} id="logo-letter-O2">O</h1>
                <h1 className="logo-letter"  style={{ left: "85%" }} id="logo-letter-S">S</h1>
            </div>
            <form>
                <input type="text" placeholder="username" id="username-input" value="admin" />
                <input type="password" placeholder="password" id="password-input" value="admin123" />
                <input type="submit" onClick={handleLogin} />
            </form>
        </div>
    )
}