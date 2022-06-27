import React, { useState, useEffect } from "react"
import { getHighestZindex, dragElement } from "../functions"
import AppIcon from "./AppIcon"


type AppWindowProps = {
    appID: string,
    children?: React.ReactNode,
    displayName?: string,
    iconID: string, 
    style?: Object
}

export default function AppWindow({ appID, children, displayName="", style={}, iconID }: AppWindowProps): React.ReactElement {
    const [zIndex, setZIndex] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        const element = (document.getElementById(appID) as HTMLElement)

        if (element) {
            element.style.left = "50px";
            element.style.top = "50px";
    
            dragElement(element)
        }
    }, [])

    useEffect(() => {
        if (isOpen) {
            setZIndex(getHighestZindex() + 1)
        }
    }, [isOpen])

    return (
        <div
            className="app-window"
            id={appID}
            style={{ display: isOpen ? "flex" : "none", zIndex, ...style }}
            onMouseDown={() => setZIndex(getHighestZindex() + 1)}
        >
            <AppIcon isOpen={isOpen} toggleFunc={() => setIsOpen(!isOpen)} iconID={iconID} title={displayName} />
            <div className="header" id={appID + "-header"}>
                <button className="close-btn" onClick={() => setIsOpen(false)}></button>
                <h1>{displayName}</h1>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    )
}
