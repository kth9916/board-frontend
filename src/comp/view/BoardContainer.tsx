import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import Header from "./view/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardList from "./view/pages/BoardList";
import NotFound from "./view/NotFound";
import RegisterBoard from "./view/pages/RegisterBoard";
import Board from "./view/pages/Board";
import Home from "./view/pages/Home";
import EditBoard from "./view/pages/EditBoard";

const BoardContainer = observer(
    () => {

        const [posts, setPosts] = useState<{ _id: string, title: string, userName : string, content: string, boardKind: number, registeredDate: string }[]>([]);

        useEffect(() => {
            getData();
        }, []);

        const getData = async () => {
            await fetch('/board/findAll').then(res => res.json()).then(json => setPosts(json));
        };

        return (
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/board/:boardKind" element={<BoardList posts={posts}></BoardList>}/>
                    <Route path="*" element={<NotFound />}></Route>
                    <Route path='/board/registerBoard' element={<RegisterBoard></RegisterBoard>}/>
                    <Route path='/board/detail/:id' element={<Board/>}/>
                    <Route path='/board/edit-board/:id' element={<EditBoard/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
)

export default BoardContainer;