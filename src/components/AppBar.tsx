import React from "react"
import BrowserApp from "./apps/BrowserApp"
import CameraApp from "./apps/CameraApp"
import FileEditorApp from "./apps/FileEditorApp"
import GalleryApp from "./apps/GalleryApp"
import RssReaderApp from "./apps/RssReaderApp"
import SettingsApp from "./apps/SettingsApp"



export default function AppBar(): React.ReactElement {
    return (
        <div className="app-bar">
            <div className="container">
                <BrowserApp />
                <FileEditorApp />
                <GalleryApp />
                <RssReaderApp />
                <CameraApp />
                <SettingsApp />
            </div>
        </div>
    )
}