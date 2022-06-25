import React, { useState, useEffect } from "react"
import { getHighestZindex } from "../helpers/getHighestZindex"


type AppWindowProps = {
    appID: string,
    isOpen: boolean,
    children?: React.ReactNode,
    closeFunc: () => void,
    displayName?: string,
    style?: Object
}


export default function AppWindow({ appID, isOpen, children, closeFunc, displayName="", style={} }: AppWindowProps): React.ReactElement {
    const [zIndex, setZIndex] = useState<number>(0)

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
            <div className="header" id={appID + "-header"}>
                <button className="close-btn" onClick={closeFunc}></button>
                <h1>{displayName}</h1>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    )
}

function dragElement(elmnt: HTMLElement) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "-header")) {
        // if present, the header is where you move the DIV from:
        (document.getElementById(elmnt.id + "-header") as HTMLElement).onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: any) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e: any) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
