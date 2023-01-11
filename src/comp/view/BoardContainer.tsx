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
import MemberRdo from "../api/feature/member/api-model/MemberRdo";
import jwtDecode from "jwt-decode";
import {JwtUtils} from "./utils/JwtUtils";


const BoardContainer = observer(
    () => {

        const [posts, setPosts] = useState<BoardRdo[]>([]);
        const [boardList, setBoardList] = useState<BoardRdo[]>([]);
        const [board, setBoard] = useState<BoardRdo>({
            _id: "", boardKind: 0, content: "", registeredDate: "", title: "", userName: ""
        });
        const [boardListName, setBoardListName] = useState<string>('');
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
        const [boardKind, setBoardKind] = useState(0);
        const [token, setToken] = useState<TokenRdo>({access_token: "", refresh_token: ""});
        const [member, setMember] = useState<MemberRdo>();
        const [account, setAccount] = useState<string>('');

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

        useEffect(() => {
            getMember(account);
        },[account])

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
        }

        // RegisterBoard
        const canSubmit = useCallback(() => {
            return content !== "" && title !== "" && boardKind !== 0;
        }, [title, content, boardKind]);

        const boardRegister = async () => {
            await axios.post("/board/registerPost", {
                title: title,
                content: content,
                boardKind: boardKind,
                userName: member?.name,
                userId : member?.account,
            });
            console.log('이름'+member?.account);
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
                userName: member?.name,
                content: content,
                boardKind: board.boardKind,
                id: _id,
                userId : member?.account,
            });
        }

        const getBoardListName = (boardKind : string) =>{
            if(boardKind === '1'){
                setBoardListName('일반 게시판');
            }
            if(boardKind === '2'){
                setBoardListName('공지 게시판');
            }
            if(boardKind === '3'){
                setBoardListName('FAQ 게시판');

            }
            if(boardKind === '4'){
                setBoardListName('Q&A 게시판');
            }
        }

        // Member

        const changeToken = (token: TokenRdo) => {
            setToken(token);
        }

        const changeAccount = (access_token : string) => {
            setAccount(JwtUtils.getAccount(access_token));
        };


        const getMember = async (account : string) => {
            await axios.get('/member/user/get', {
                params: {
                    account: account
                }
            }).then(res => setMember(res.data));
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
                                                       boardList={boardList} getBoardListName={getBoardListName} boardListName={boardListName}></BoardList> }/>
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
                            <Route path='/login' element={<Login changeToken={changeToken} changeAccount={changeAccount}/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
)

export default BoardContainer;