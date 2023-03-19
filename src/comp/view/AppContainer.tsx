
import React, {useCallback, useEffect} from "react";
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
import {JwtUtils} from "./utils/JwtUtils";
import {useAtom} from "jotai";
import {atom} from "jotai";
import {useQuery} from "react-query";
import {useSetAtom} from "jotai";
import {SetStateAction} from "jotai";
import MyPage from "./view/pages/myPage/MyPage";

export const postsAtom = atom([]);
export const postsQueryAtom = atom(false);
export const tokenAtom = atom<TokenRdo>({access_token: '', refresh_token: ''});
export const boardListAtom = atom<BoardRdo[]>([]);
export const myBoardListAtom = atom<BoardRdo[]>([]);
export const boardAtom = atom({
    _id: "", boardKind: 0, content: "", registeredDate: "", title: "", userName: "", userId: "", image: null as File | null
})
export const boardListNameAtom = atom('');
export const myBoardListNameAtom = atom('');
export const titleAtom = atom('');
export const contentAtom = atom('');
export const boardKindAtom = atom('');
export const memberAtom = atom({account : '', name : '', nickname : '', email : ''});
export const accountAtom = atom('');
export const antenaAtom = atom(false);
export const selectedImageAtom = atom<File | null>(null);
export const imagePathAtom = atom('');

const AppContainer = (
    () => {
        const [posts, setPosts] = useAtom(postsAtom);
        const setPostsQueryEnabled = useSetAtom(postsQueryAtom);
        const [token, setToken] = useAtom(tokenAtom);
        const [myBoardList, setMyBoardList] = useAtom(myBoardListAtom);
        const [selectedImage, setSelectedImage] = useAtom(selectedImageAtom);


        const [boardList, setBoardList] = useAtom(boardListAtom);


        const [board, setBoard] = useAtom(boardAtom);

        const [boardListName, setBoardListName] = useAtom(boardListNameAtom);
        const [myBoardListName, setMyBoardListName] = useAtom(myBoardListNameAtom);

        const [title, setTitle] = useAtom(titleAtom);

        const [content, setContent] = useAtom(contentAtom);

        const [boardKind, setBoardKind] = useAtom(boardKindAtom);



        const [member, setMember] = useAtom(memberAtom);

        const [account, setAccount] = useAtom(accountAtom);


        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token['access_token'];
        axios.defaults.headers.common['refresh_token'] = 'Bearer ' + token['refresh_token'];

        // const { isLoading, data } = useQuery('posts', async () => {
        //     const response = await axios.get('board/findAll');
        //     return response.data;
        // });
        //
        // useEffect(() => {
        //     if(!isLoading && data){
        //         setPosts(data);
        //     }
        // },[isLoading, data, setPosts]);

        useEffect(()=>{
            setPostsQueryEnabled(true);
        },[setPostsQueryEnabled]);

        useEffect(() => {
            const interval = setInterval(async () => {
                try {
                    const response = await axios.post('/member/refresh', {
                        access_token: token.access_token,
                        refresh_token: token.refresh_token,
                    });
                    setToken(response.data);
                } catch (error) {
                    console.error('Failed to refresh access token:', error);
                }
            }, 1000 * 60 * 30);

            return () => clearInterval(interval);
        }, [token, setToken]);

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
            return content !== "" && title !== "" && boardKind !== '';
        }, [title, content, boardKind]);

        const boardRegister = async (formData: FormData) => {
            await axios.post("/board/registerPost",formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        };

        const handleBoardKindChange = (e: any) => {
            setBoardKind(e.target.value);
        }

        // FindByUserId
        const findByUserId = async (userId: string) => {
            await axios.get(`/board/findByUserId/${userId}`).then(res => setMyBoardList(sortJson(res.data, 'registeredDate', 'desc')))
        }

        const findByUserIdAndBoardKind = async (userId: string, boardKind: number) => {
            await axios.get(`/board/findByUserIdAndBoardKind/${userId}/${boardKind}`).then(res => setMyBoardList(sortJson(res.data, 'registeredDate', 'desc')))
        }



        // Board
        const getBoard = async (_id: string) => {
            await axios.get(`/board/findById/${_id}`).then(res => (setBoard as (value:SetStateAction<BoardRdo>) => void)(res.data));
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

        const getMyBoardListName = (boardKind : string) =>{
            if(boardKind === '1'){
                setMyBoardListName('일반 게시판');
            }
            if(boardKind === '2'){
                setMyBoardListName('공지 게시판');
            }
            if(boardKind === '3'){
                setMyBoardListName('FAQ 게시판');

            }
            if(boardKind === '4'){
                setMyBoardListName('Q&A 게시판');
            }
        }

        // Member

        useEffect(() => {
            getMember(account);
        },[account])

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
                                   element={<BoardList getBoardList={getBoardList} getBoardListName={getBoardListName}></BoardList> }/>
                            <Route path="*" element={<NotFound/>}></Route>
                            <Route
                                path='/board/registerBoard'
                                element={
                                    <PrivateRoute path='/login'
                                                  component={<RegisterBoard boardRegister={boardRegister}
                                                                            canSubmit={canSubmit}
                                                                            handleChange={handleBoardKindChange}/>}/>}/>
                            <Route path='/board/detail/:id'
                                   element={<Board getBoard={getBoard} boardDelete={boardDelete}/>}/>
                            <Route path='/board/edit-board/:id'
                                   element={<EditBoard boardEdit={boardEdit} getBoard={getBoard}/>}/>
                            <Route path='/join' element={<SignUp/>}/>
                            <Route path='/login' element={<Login changeToken={changeToken} changeAccount={changeAccount}/>}/>
                            <Route path='/myboard-list' element={<MyPage findByUserIdAndBoardKind={findByUserIdAndBoardKind} getMyBoardListName={getMyBoardListName} handleBoardKindChange={handleBoardKindChange} findByUserId={findByUserId}/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
)

export default AppContainer;