import React from "react"
import { useAuthGuard } from "../customHooks/useAuthGuard"
import AppBar from "./AppBar"
import StatusBar from "./StatusBar"


export default function OSPage(): React.ReactElement {
    const user = useAuthGuard()

    if (user) {
        return (
            <div className="os-page">
                <StatusBar username={user.name} />
                <div className="desktop"></div>
                <AppBar />
            </div>
        )
    }
    else {
        return <></>
    }
}