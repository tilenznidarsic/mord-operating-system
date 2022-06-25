import React, { useState } from "react"
import AppWindow from "../AppWindow"


export default function BrowserApp(): React.ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <>
            <div className={"browser-app-icon " + (isOpen ? "open" : "")} onClick={() => setIsOpen(!isOpen)}></div>
            <AppWindow
                appID="browser-app"
                isOpen={isOpen}
                closeFunc={() => setIsOpen(false)}
                displayName="Browser"
                style={{ height: "70vh", aspectRatio: "5/4" }}
            >
                <input type="text" placeholder="Search" />
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111224.4586395269!2d-21.83444966923145!3d64.17784030861954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48d676e94e16bb19%3A0xbbfa0fceed0119cc!2sReykjav%C3%ADkurborg%2C%20Iceland!5e0!3m2!1sen!2ssi!4v1656173298006!5m2!1sen!2ssi" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </AppWindow>
        </>
    )
}   