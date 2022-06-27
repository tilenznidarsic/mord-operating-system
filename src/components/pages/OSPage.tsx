import React from "react"
import { useAuthGuard } from "../../customHooks/useAuthGuard"
import AppBar from "../AppBar"
import StatusBar from "../StatusBar"
import BrowserApp from "../apps/BrowserApp"
import CameraApp from "../apps/CameraApp"
import FileEditorApp from "../apps/FileEditorApp"
import GalleryApp from "../apps/GalleryApp"
import RssReaderApp from "../apps/RssReaderApp"
import SettingsApp from "../apps/SettingsApp"

export default function OSPage(): React.ReactElement {
    const user = useAuthGuard()

    if (user) {
        return (
            <div className="os-page">
                <StatusBar username={user.name} />
                <div className="desktop">
                    <BrowserApp />
                    <FileEditorApp />
                    <GalleryApp />
                    <RssReaderApp />
                    <CameraApp />
                    <SettingsApp />
                </div>
                <AppBar />
            </div>
        )
    }
    else {
        return <></>
    }
}