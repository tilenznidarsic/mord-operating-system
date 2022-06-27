import React, { useEffect, useState } from "react"
import { LS_PHOTOS_KEY } from "../../constants"
import AppWindow from "../AppWindow"
import { Photo } from "../../types/Photo.type"
import { useUserFiles } from "../../customHooks/useUserFiles"


export default function GalleryApp(): React.ReactElement {
    const { files } = useUserFiles<Photo>(LS_PHOTOS_KEY)
    const [remoteImages, setRemoteImages] = useState<Array<any>>([])
    const [selectedImage, setSelectedImage] = useState<any>(null)

    useEffect(() => {
        (async () => {
            await fetch("https://jsonplaceholder.typicode.com/photos")
                .then(res => res.json())
                .then(jsn => setRemoteImages(jsn.slice(0, 20)))
        })()
    }, [])
    
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
                        [...files.sort((a: Photo, b: Photo) => a.date > b.date ? -1 : 1), ...remoteImages].map((image: any, index: number) => (
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
