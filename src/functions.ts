import { LS_USERS_KEY } from "./constants"


export function setupDefaultUser() {
    const usersDB = localStorage.getItem(LS_USERS_KEY)

    if (!usersDB) {
        localStorage.setItem(LS_USERS_KEY, JSON.stringify([{
            name: "admin",
            password: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
            profile: "#2094fa",
            date: 0
        }]))

        console.log("Default user setup!")
    }
}


export function getHighestZindex(): number {
    var elements = Array.prototype.slice.call(document.getElementsByClassName("app-window"))
    var highest_index = 0;

    elements.forEach((element: HTMLElement) => {
        if (parseInt(element.style.zIndex) > highest_index) {
            highest_index = parseInt(element.style.zIndex);
        }
    })

    return highest_index
}


export function dragElement(elmnt: HTMLElement) {
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