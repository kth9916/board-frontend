import {observer} from "mobx-react";
import React, {useCallback, useEffect, useState} from "react";
import Header from "./view/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardList from "./view/pages/BoardList";
import NotFound from "./view/NotFound";
import RegisterBoard from "./view/pages/RegisterBoard";
import Home from "./view/pages/Home";
import BoardRdo from "../api/feature/board/api-model/BoardRdo";
import axios from "axios";
import PrivateRoute from "./routes/PrivateRoute";
import Board from "./view/pages/Board";
import EditBoard from "./view/pages/EditBoard";
import SignUp from "./view/pages/sign-up/SignUp";
import Login from "./view/pages/login/Login";
import TokenRdo from "../api/feature/member/api-model/TokenRdo";


const BoardContainer = observer(
    () => {

        const [posts, setPosts] = useState<BoardRdo[]>([]);
        const [boardList, setBoardList] = useState<BoardRdo[]>([]);
        const [board, setBoard] = useState<BoardRdo>({
            _id: "", boardKind: 0, content: "", registeredDate: "", title: "", userName: ""
        });
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
        const [userName, setUserName] = useState('');
        const [boardKind, setBoardKind] = useState(0);
        const [token, setToken] = useState<TokenRdo>({access_token: "", refresh_token: ""});

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token['access_token'];
        axios.defaults.headers.common['refresh_token'] = 'Bearer ' + token['refresh_token'];

        // 30분
        let timeout = 1000 * 60 * 30;

        setTimeout(()=>{
            axios.post('/member/refresh', {
                access_token : token['access_token'],
                refresh_token : token['refresh_token'],
            }).then(r => setToken(r.data))
        }, timeout )

        useEffect(() => {
            getData();
        }, [token]);

        //{headers: {Authorization: 'Bearer ' + token}}
        const getData = async () => {
            await axios.get('/board/findAll' ).then(res => {
                setPosts(res.data);
            })
        };

        // BoardList

        const sortJson = (data: any, key: any, type: string) => {
            if (type == undefined) {
                type = 'asc';
            }
            return data.sort((a: any, b: any) => {
                let x = a[key];
                let y = b[key];

                if (type == 'desc') {
                    return x > y ? -1 : x < y ? 1 : 0;
                } else if (type == 'asc') {
                    return x < y ? -1 : x > y ? 1 : 0;
                }
            });
        }

        const getBoardList = async (boardKind: number) => {
            await axios.get(`/board/findByBoardKind/${boardKind}`).then(res => {
                setBoardList(sortJson(res.data, 'registeredDate', 'desc'))
            });
            console.log(token);
        }

        // RegisterBoard
        const canSubmit = useCallback(() => {
            return content !== "" && title !== "" && boardKind !== 0 && userName !== "";
        }, [title, content, boardKind, userName]);

        const boardRegister = async () => {
            await axios.post("/board/registerPost", {
                title: title,
                content: content,
                boardKind: boardKind,
                userName: userName
            });
        }

        const handleChange = (e: any) => {
            setBoardKind(e.target.value);
        }

        // Board
        const getBoard = async (_id: string) => {
            await axios.get(`/board/findById/${_id}`).then(res => setBoard(res.data));
        }

        const boardDelete = async (_id: string) => {
            await axios.delete(`/board/deleteById/${_id}`);
        }

        const boardEdit = async (title: string, content: string, _id: string) => {
            await axios.put(`/board/modifyById/${_id}`, {
                title: title,
                userName: board.userName,
                content: content,
                boardKind: board.boardKind,
                id: _id
            });
        }

        const changeToken = (token: TokenRdo) => {
            setToken(token);
        }

        return (
            <BrowserRouter>
                <Header token={token} changeToken={changeToken}/>
                <div style={{marginTop: '1rem', display: 'flex', justifyContent: 'center'}}>
                    <div style={{
                        border: '3px solid black',
                        width: '200rem',
                        marginBottom: '1rem',
                        height: '80rem',
                        backgroundColor: 'white'
                    }}>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/board/:boardKind"
                                   element={<BoardList posts={posts} getBoardList={getBoardList}
                                                       boardList={boardList}></BoardList>}/>
                            <Route path="*" element={<NotFound/>}></Route>
                            <Route
                                path='/board/registerBoard'
                                element={
                                    <PrivateRoute token={token} path='/login'
                                                  component={<RegisterBoard boardRegister={boardRegister}
                                                                            content={content}
                                                                            setContent={setContent}
                                                                            title={title}
                                                                            setTitle={setTitle}
                                                                            userName={userName}
                                                                            setUserName={setUserName}
                                                                            canSubmit={canSubmit}
                                                                            boardKind={boardKind}
                                                                            setBoardKind={setBoardKind}
                                                                            handleChange={handleChange}/>}/>}/>
                            <Route path='/board/detail/:id'
                                   element={<Board getBoard={getBoard} board={board} setBoard={setBoard}
                                                   boardDelete={boardDelete}/>}/>
                            <Route path='/board/edit-board/:id'
                                   element={<EditBoard boardEdit={boardEdit} board={board} getBoard={getBoard}/>}/>
                            <Route path='/join' element={<SignUp/>}/>
                            <Route path='/login' element={<Login changeToken={changeToken}/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
)

export default BoardContainer;