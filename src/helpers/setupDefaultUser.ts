import { LS_USERS_KEY } from "../constants"

export function setupDefaultUser() {
    const usersDB = localStorage.getItem(LS_USERS_KEY)

    if (!usersDB) {
        localStorage.setItem(LS_USERS_KEY, JSON.stringify([{
            name: "admin",
            password: "admin123"
        }]))

        console.log("Default user setup!")
    }
}