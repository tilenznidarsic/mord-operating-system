import React from "react"
import { useAuthGuard } from "../customHooks/useAuthGuard"
import AppBar from "./AppBar"
import StatusBar from "./StatusBar"


export default function OSPage(): React.ReactElement {
    const user = useAuthGuard()

    return (
        <div className="os-page">
            <StatusBar username={user ? user.name : ""} />
            <AppBar />
        </div>
    )
}