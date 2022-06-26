import React, { useState, useRef, useCallback, useContext } from "react"
import AppWindow from "../AppWindow"
import Webcam from "react-webcam";
import { LS_PHOTOS_KEY } from "../../constants";
import moment from "moment";
import { Photo } from "../../types/Photo.type"
import { MordOSContext } from "../StoreProvider";


export default function CameraApp(): React.ReactElement {
    const { authenticatedUser } = useContext(MordOSContext)
    const webcamRef = useRef(null);
    const [image, setImage] = useState<string | null>(null)

    const capture = useCallback(
        () => {
            const imageSrc: any = webcamRef.current;
            setImage(imageSrc?.getScreenshot())
      },
      [webcamRef]
    );

    const saveHandler = () => {
        const imagesDB: Array<Photo> = JSON.parse(localStorage.getItem(LS_PHOTOS_KEY) || "[]")
        
        localStorage.setItem(LS_PHOTOS_KEY, JSON.stringify([
            ...imagesDB,
            {
                content: image,
                creator: authenticatedUser.name,
                date: moment().unix()
            }
        ]))

        setImage(null)
    }

    return (
        <AppWindow
            appID="camera-app"
            displayName="Camera"
            iconID="camera"
        >
            {
                image ?
                    <img src={image} alt="my-photo" />
                    :
                    <Webcam
                        width={1280}
                        height={720}
                        screenshotFormat="image/jpeg"
                        ref={webcamRef}
                    />
                }
                <div className="controls">
                {!image ?
                    <button className="record" onClick={capture}></button>
                    :
                    <>
                        <button className="save" onClick={saveHandler}>SAVE</button>
                        <button className="cancel" onClick={() => setImage(null)}>CANCEL</button>
                    </>
                }
                </div>
        </AppWindow>
    )
}