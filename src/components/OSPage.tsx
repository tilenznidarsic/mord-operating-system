import React from "react"
import { useAuthGuard } from "../customHooks/useAuthGuard"


export default function OSPage(): React.ReactElement {
    const user = useAuthGuard()

    return (
        <div className="os-page">
            <h1>OS {user && user.name}</h1>
        </div>
    )
}