import React, { useState, useRef, useCallback, useContext } from "react"
import AppWindow from "../AppWindow"
import Webcam from "react-webcam";
import { LS_PHOTOS_KEY } from "../../constants";
import moment from "moment";
import { Photo } from "../../types/Photo.type"
import { MordOSContext } from "../StoreProvider";


export default function CameraApp(): React.ReactElement {
    const { authenticatedUser } = useContext(MordOSContext)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const webcamRef = useRef(null);
    const [image, setImage] = useState<string | null>(null)

    const capture = useCallback(
        () => {
            const imageSrc: any = webcamRef.current;
            setImage(imageSrc?.getScreenshot())
      },
      [webcamRef]
    );

    const cancelHandler = () => setImage(null)

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
        <>
            <div className={"camera-app-icon " + (isOpen ? "open" : "") } onClick={() => setIsOpen(!isOpen)}></div>
            <AppWindow
                appID="camera-app"
                isOpen={isOpen}
                closeFunc={() => setIsOpen(false)}
                displayName="Camera"
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
                            <button className="cancel" onClick={cancelHandler}>CANCEL</button>
                        </>
                    }
                    </div>
            </AppWindow>
        </>
    )
}