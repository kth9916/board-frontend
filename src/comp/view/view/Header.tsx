import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import '../css/Header.scss';
import {JwtUtils} from "../utils/JwtUtils";

const Header = observer(
    (props:any) => {
        const navigate = useNavigate();
        const access_token = props.token['access_token'];
        const [isAuth, setIsAuth] = useState(false);

        useEffect(()=>{
            if(JwtUtils.isAuth(access_token)){
                setIsAuth(true);
            }else{
                setIsAuth(false);
            }
        },[access_token]);

        // 비동기로 처리
        const logout = async () => {
            await props.changeToken({access_token: "", refresh_token: ""});
            alert('로그아웃 되었습니다 😚');
            navigate('/');
        }

        return (
            <div className="header-wrapper">
                <div className="header-title">
                    <Link to="/">
                        <span>Home</span>
                    </Link>
                </div>
                <div className="header-menu">
                    <Link to="/board/1">일반 게시판</Link><br/>
                    <Link to="/board/2">공지 게시판</Link><br/>
                    <Link to="/board/3">FAQ 게시판</Link><br/>
                    <Link to="/board/4">Q&A 게시판</Link><br/>
                    <Link to="/board/registerBoard">글쓰기</Link><br/>
                    {isAuth ? (
                        <>
                            <Link to='/myboard-list'>내 게시물</Link>
                            <Link to='#' onClick={logout}>로그아웃</Link>
                        </>
                    ) : (
                        <>
                            <Link to='/join'>회원가입</Link>
                            <Link to='/login' >로그인</Link>
                        </>
                    )}
                </div>
            </div>
        )
    }
)

export default Header;