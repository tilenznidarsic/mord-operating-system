import React, { useContext } from "react"
import { MordOSContext } from "./StoreProvider"
import moment from "moment"


type StatusBarProps = {
    username: string
}

export default function StatusBar({ username }: StatusBarProps): React.ReactElement {
    const { setAuthenticatedUser } = useContext(MordOSContext)

    const logoutHandler = () => {
        setAuthenticatedUser(null)
    }

    return (
        <div className="status-bar">
            <div className="container">
                {username + "'s workspace"}
            </div>
            <div className="container center">{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>
            <div className="container end">
                <button className="logout-btn" onClick={logoutHandler}>logout</button>
            </div>
        </div>
    )
}