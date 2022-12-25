import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import BoardList from "./view/BoardList";
import BoardItem from "./view/BoardItem";

const BoardContainer = observer(
    () => {

        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
        const [posts, setPosts] = useState<{_id:string, title :string, content : string, boardNo : number}[]>([]);

        const getData = async () => {
            await fetch('/board/findAll').then(res => res.json()).then(json => setPosts(json));
        }

        useEffect(() => {
            getData();
        },[]);

        const findByTitle = (post: { title: React.SetStateAction<string>; content: React.SetStateAction<string>; }) => {
            setTitle(post.title);
            setContent(post.content)
            console.log(title);
        }

        return (
            <div>
                {posts.sort((a,b)=>a.boardNo-b.boardNo).map((post) => <BoardList post={post} findByTitle={findByTitle}/>)}
                <BoardItem title={title} content={content} />
            </div>
        )
    }
)

export default BoardContainer;