import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"


type AppIconProps = {
    isOpen: boolean,
    toggleFunc: () => void,
    iconID: string,
    title: string
}

export default function AppIcon({ isOpen, toggleFunc, iconID, title }: AppIconProps): React.ReactElement {
    const [el, setEl] = useState<any>(null)

    useEffect(() => {
        setEl(document.getElementById("app-bar-container"))
    }, [])

    if (el) {
        return ReactDOM.createPortal(
            <div
                className={`app-icon ${iconID} ` + (isOpen ? "open" : "")}
                onClick={toggleFunc}
                title={title}
            ></div>,
            el
        )
    }

    return <></>
}