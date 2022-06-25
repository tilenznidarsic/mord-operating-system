import React from "react"
import FileEditorApp from "./apps/FileEditorApp"
import RssReaderApp from "./apps/RssReaderApp"
import SettingsApp from "./apps/SettingsApp"



export default function AppBar(): React.ReactElement {
    return (
        <div className="app-bar">
            <div className="container">
                <FileEditorApp />
                <RssReaderApp />
                <SettingsApp />
            </div>
        </div>
    )
}