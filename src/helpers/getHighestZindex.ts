

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