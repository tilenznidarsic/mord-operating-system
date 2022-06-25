import moment from "moment"
import React, { useState, useEffect, useContext } from "react"
import { LS_FILES_KEY } from "../../constants"
import AppWindow from "../AppWindow"
import { MordOSContext } from "../StoreProvider"
import { File } from "../../types/File.type"


export default function FileEditorApp(): React.ReactElement {
    const { authenticatedUser } = useContext(MordOSContext)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [files, setFiles] = useState<Array<File>>(JSON.parse(localStorage.getItem(LS_FILES_KEY) ||"[]"))
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    
    const saveNewFile = () => {
        const textArea = (document.getElementById("file-textarea") as HTMLTextAreaElement)
        const fileTitle = (document.getElementById("file-title-input") as HTMLInputElement)
        const filesDB = JSON.parse(localStorage.getItem(LS_FILES_KEY) || "[]")
        
        const newFile = {
            index: filesDB.length + 1,
            creator: authenticatedUser.name,
            title: fileTitle.value ||`File #${filesDB.length + 1}`,
            content: textArea.value,
            date: moment().unix()
        }

        localStorage.setItem(LS_FILES_KEY, JSON.stringify([
            ...filesDB,
            newFile
        ]))

        setFiles([...filesDB, newFile])

        textArea.value = ""
        fileTitle.value = ""
    }

    useEffect(() => {
        const textArea = (document.getElementById("file-textarea") as HTMLTextAreaElement)
        const fileTitle = (document.getElementById("file-title-input") as HTMLInputElement)
        
        if (selectedFile) {
            textArea.value = selectedFile.content
            fileTitle.value = selectedFile.title
        }
        else {
            textArea.value = ""
            fileTitle.value = ""
        }

    }, [selectedFile])

    const fileClickHandler = (file: File | null) => {
        setSelectedFile(file)
    }

    const deleteFileHandler = () => {
        if (selectedFile) {
            const newFiles = files.filter((file: File) => file.date !== selectedFile.date)
            localStorage.setItem(LS_FILES_KEY, JSON.stringify(newFiles))
            setFiles(newFiles)
        }
    }

    return (
        <>
            <div className={"file-editor-app-icon " + (isOpen ? "open" : "")} onClick={() => setIsOpen(!isOpen)}></div>
            <AppWindow
                appID="file-editor-app"
                isOpen={isOpen}
                closeFunc={() => setIsOpen(false)}
                displayName="File Editor"
                style={{ height: "70vh" }}
            >
                <div className="file-explorer">
                    {
                        files?.map((file: File, index: number) => (
                            <FileCard
                                file={file}
                                key={`fc-${index}`}
                                onClick={fileClickHandler}
                                selected={selectedFile ? selectedFile.date === file.date : false}
                            />
                        ))
                    }
                </div>
                <div className="editor">
                    <div className="tools">
                        <input type="text" placeholder="Title" id="file-title-input" />
                        {selectedFile ?
                            <>
                                <button onClick={() => fileClickHandler(null)}>NEW FILE</button>
                                <button onClick={deleteFileHandler}>DELETE</button>
                            </>
                            :
                            <button onClick={saveNewFile}>SAVE</button>
                        }
                    </div>
                    <textarea id="file-textarea"></textarea>
                </div>
            </AppWindow>
        </>
    )
}


const FileCard = ({ file, onClick, selected }: { file: File, onClick: any, selected: boolean }) => {
    return (
        <div className={"file-card " + (selected ? "selected" : "")} onClick={() => onClick(file)}>
            <h2>{file.title}</h2>
            <h3>({moment.unix(file.date).format("DD/MM/YYYY")}) {file.creator}</h3>
        </div>
    )
} 