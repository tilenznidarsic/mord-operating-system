import { useState, useEffect, useContext } from "react";
import { MordOSContext } from "../components/StoreProvider";


type FileWithCreator = {
    creator: string
}

// ONLY for localstorage database NOT fetching
export function useUserFiles<T extends FileWithCreator>(key: string) {
    const { authenticatedUser } = useContext(MordOSContext)
    const [files, setFiles] = useState<Array<T>>(authenticatedUser ?
        JSON.parse(localStorage.getItem(key) || "[]").filter((item: T) => item.creator === authenticatedUser.name)
        :
        []
    )

    const itemInsertedHandler = () => {
        if (authenticatedUser) {
            setFiles(JSON.parse(localStorage.getItem(key) || "[]").filter((item: T) => item.creator === authenticatedUser.name))
        }
    }

    useEffect(() => {
        document.addEventListener("itemInserted", itemInsertedHandler)

        return () => document.removeEventListener("itemInserted", itemInsertedHandler)
    }, [])

    return { files, setFiles, authenticatedUser }
}