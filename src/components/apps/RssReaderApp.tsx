import React, { useState, useEffect } from "react"
import AppWindow from "../AppWindow"


export default function RssReaderApp(): React.ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [data, setData] = useState([])
    const [page, setPage] = useState<number>(1)


    useEffect(() => {
        (async () => {
            await fetch("https://jsonplaceholder.typicode.com/comments")
                .then(res => res.json())
                .then(jsn => setData(jsn))
        })()
    }, [])

    const pageHandler = (dir: number) => {
        if (dir > 0) {
            setPage(page + 1)
        }
        else if (dir < 0) {
            setPage(page - 1 < 1 ? 1 : page - 1)
        }
    }

    return (
        <>
            <div className={"rss-reader-app-icon " + (isOpen ? "open" : "") } onClick={() => setIsOpen(!isOpen)}></div>
            <AppWindow
                appID="rss-reader-app"
                isOpen={isOpen}
                closeFunc={() => setIsOpen(false)}
                displayName="RSS Reader"
            >
                {data.slice((page*20) - 20, page * 20).map((post: any, index: number) => (
                    <RssPost post={post} page={page} />
                ))}
                <div className="pager">
                    <button onClick={() => pageHandler(-1)}>{"<"}</button>
                    <span>{page}</span>
                    <button onClick={() => pageHandler(1)}>{">"}</button>
                </div>
            </AppWindow>
        </>
    )
}


const RssPost = ({ post, page }: any) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        setIsOpen(false)
    }, [page])

    return (
        <div className="rss-post" onClick={() => setIsOpen(!isOpen)}>
            <div className="post-header">{post.email + ": " + post.name}</div>
            <div className="post-body" style={{ display: (isOpen ? "flex" : "none")}}>{post.body}</div>
        </div>
    )
}