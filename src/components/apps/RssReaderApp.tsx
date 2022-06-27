import React, { useState, useEffect } from "react"
import AppWindow from "../AppWindow"


type RssPost = {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

const POSTS_PER_PAGE = 20;

export default function RssReaderApp(): React.ReactElement {
    const [posts, setPosts] = useState<Array<RssPost>>([])
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        (async () => {
            await fetch("https://jsonplaceholder.typicode.com/comments")
                .then(res => res.json())
                .then(jsn => setPosts(jsn))
        })()
    }, [])

    const pageHandler = (dir: number) => {
        if (dir > 0 && POSTS_PER_PAGE * page < posts.length) {
            setPage(page + 1)
        }
        else if (dir < 0) {
            setPage(page - 1 < 1 ? 1 : page - 1)
        }
    }

    return (
        <AppWindow
            appID="rss-reader-app"
            displayName="RSS Reader"
            iconID={"rss-reader"}
        >
            {posts.slice((page*POSTS_PER_PAGE) - POSTS_PER_PAGE, page * POSTS_PER_PAGE).map((post: any, index: number) => (
                <RssPostCard
                    key={`rssp-${index}`}
                    post={post}
                    page={page}
                />
            ))}
            <div className="pager">
                <button onClick={() => pageHandler(-1)}>{"<"}</button>
                <span>{page}</span>
                <button onClick={() => pageHandler(1)}>{">"}</button>
            </div>
        </AppWindow>
    )
}

const RssPostCard = ({ post, page }: { post: RssPost, page: number}) => {
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