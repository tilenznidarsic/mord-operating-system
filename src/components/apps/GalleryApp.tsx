import React, { useEffect, useState } from "react"
import { LS_PHOTOS_KEY } from "../../constants"
import AppWindow from "../AppWindow"


export default function GalleryApp(): React.ReactElement {
    const [selectedImage, setSelectedImage] = useState<any>(null)
    const [data, setData] = useState<Array<any>>(JSON.parse(localStorage.getItem(LS_PHOTOS_KEY) ||"[]").reverse())

    useEffect(() => {
        // initial fetch
        getImages()

        // listen localstorage changes and update data
        document.addEventListener("itemInserted", getImages);

        return () => document.removeEventListener("itemInserted", getImages);
    }, [])

    const getImages = async () => {
        await fetch("https://jsonplaceholder.typicode.com/photos")
            .then(res => res.json())
            .then(jsn => setData([...JSON.parse(localStorage.getItem(LS_PHOTOS_KEY) ||"[]").reverse(), ...jsn.slice(0, 20)]))
    }

    return (
        <AppWindow
            appID="gallery-app"
            displayName="Gallery"
            iconID="gallery"
        >
            {
                !selectedImage ?
                    <div className="gallery-grid">
                    {
                        data.map((image: any, index: number) => (
                            <img
                                key={`gi-${index}`}
                                src={image.url || image.content}
                                alt=""
                                onClick={() => setSelectedImage(image)}
                            />
                            ))
                    }
                    </div>
                    :
                    <div className="selected-image">
                        <img src={selectedImage.url || selectedImage.content} alt="" />
                        <button onClick={() => setSelectedImage(null)}>X</button>
                    </div>
            }
        </AppWindow>
    )
}
