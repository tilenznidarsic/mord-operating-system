import React from "react"
import RssReaderApp from "./apps/RssReaderApp"
import SettingsApp from "./apps/SettingsApp"



export default function AppBar(): React.ReactElement {
    return (
        <div className="app-bar">
            <div className="container">
                <RssReaderApp />
                <SettingsApp />
            </div>
        </div>
    )
}