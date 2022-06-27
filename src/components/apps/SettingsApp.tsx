import React from "react"
import { LS_USERS_KEY, USER_COLORS } from "../../constants"
import AppWindow from "../AppWindow"
import CryptoJS from 'crypto-js';
import { User } from "../../types/User.type"
import useUsers from "../../customHooks/useUsers"
import moment from "moment";


export default function SettingsApp(): React.ReactElement {
    const { users, authenticatedUser } = useUsers()

    const changePassHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        const oldPass = (document.getElementById("old-password-input") as HTMLInputElement)
        const newPass = (document.getElementById("new-password-input") as HTMLInputElement)

        if (authenticatedUser.password === CryptoJS.SHA256(oldPass.value).toString(CryptoJS.enc.Hex)) {
            const newUsers = [
                ...users.filter((user: User) => user.name !== authenticatedUser.name),
                {
                    ...authenticatedUser,
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

        if (!users.find((user: User) => user.name === newUserName.value) && newUserName.value && newUserPass.value) {
            localStorage.setItem(LS_USERS_KEY, JSON.stringify([
                ...users,
                {
                    name: newUserName.value,
                    password: CryptoJS.SHA256(newUserPass.value).toString(CryptoJS.enc.Hex),
                    profile: USER_COLORS[users.length],
                    date: moment().unix()
                }
            ]))

            newUserName.value = ""
            newUserPass.value = ""
        }
    }
    return (
        <AppWindow
            appID="settings-app"
            displayName="Settings"
            iconID="settings"
        >
            <div className="user-manager">
                <h1>Manage users</h1>
                {
                    users.map((user: User, index: number) => (
                        <div className="user-card" key={`uc-${index}`}>
                            <div className="info">
                                <div className="user-color" style={{ background: user.profile }}></div>
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
                {authenticatedUser.name === "admin" && users.length < 4 &&
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
    )
}