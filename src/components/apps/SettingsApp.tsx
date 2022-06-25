import React, {useContext, useState } from "react"
import { LS_USERS_KEY } from "../../constants"
import { User } from "../../types/User.type"
import AppWindow from "../AppWindow"
import { MordOSContext } from "../StoreProvider"
import CryptoJS from 'crypto-js';


export default function SettingsApp(): React.ReactElement {
    const usersDB = JSON.parse(localStorage.getItem(LS_USERS_KEY) || "{}")
    const { authenticatedUser } = useContext(MordOSContext)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const changePassHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        const oldPass = (document.getElementById("old-password-input") as HTMLInputElement)
        const newPass = (document.getElementById("new-password-input") as HTMLInputElement)

        if (authenticatedUser.password === CryptoJS.SHA256(oldPass.value).toString(CryptoJS.enc.Hex)) {
            const newUsers = [
                ...usersDB.filter((user: User) => user.name !== authenticatedUser.name),
                {
                    name: authenticatedUser.name,
                    password: CryptoJS.SHA256(newPass.value).toString(CryptoJS.enc.Hex)
                }
            ]

            localStorage.setItem(LS_USERS_KEY, JSON.stringify(newUsers))
            oldPass.value = ""
            newPass.value = ""
        }
    }

    const addNewUserHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        const newUserName = (document.getElementById("new-user-name-input") as HTMLInputElement)
        const newUserPass = (document.getElementById("new-user-pass-input") as HTMLInputElement)

        if (!usersDB.find((user: User) => user.name === newUserName.value)) {
            localStorage.setItem(LS_USERS_KEY, JSON.stringify([
                ...usersDB,
                {
                    name: newUserName.value,
                    password: CryptoJS.SHA256(newUserPass.value).toString(CryptoJS.enc.Hex)
                }
            ]))

            newUserName.value = ""
            newUserPass.value = ""
        }
    }
    const userColors = ["#2094fa", "#32a852", "#eaed3b", "#fa205a"]
    return (
        <>
            <div className={"settings-app-icon " + (isOpen ? "open" : "") } onClick={() => setIsOpen(true)}></div>
            <AppWindow
                appID="settings-app"
                isOpen={isOpen}
                closeFunc={() => setIsOpen(false)}
                displayName="Settings"
            >
                <div className="user-manager">
                    <h1>Manage users</h1>
                    {
                        usersDB.map((user: User, index: number) => (
                            <div className="user-card" key={`uc-${index}`}>
                                <div className="info">
                                    <div className="user-color" style={{ background: userColors[index]}}></div>
                                    <h2>{user.name}</h2>
                                </div>
                                {user.name === authenticatedUser.name && (
                                    <form>
                                        <input type="password" placeholder="Current password" id="old-password-input" />
                                        <input type="password" placeholder="New password" id="new-password-input" />
                                        <input type="submit" value="Change" onClick={changePassHandler} />
                                    </form>
                                )}
                            </div>
                        ))
                    }
                    {usersDB.length < 4 &&
                        <div className="new-user-card">
                            <form>
                                <input type="text" placeholder="Name" id="new-user-name-input" />
                                <input type="password" placeholder="Password" id="new-user-pass-input" />
                                <input type="submit" value="Create" onClick={addNewUserHandler} />
                            </form>
                        </div>
                    }
                </div>
            </AppWindow>
        </>
    )
}