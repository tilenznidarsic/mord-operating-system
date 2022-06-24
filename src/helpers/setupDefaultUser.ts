import { LS_USERS_KEY } from "../constants"

export function setupDefaultUser() {
    const usersDB = localStorage.getItem(LS_USERS_KEY)

    if (!usersDB) {
        localStorage.setItem(LS_USERS_KEY, JSON.stringify([{
            name: "admin",
            password: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"
        }]))

        console.log("Default user setup!")
    }
}