import {observer} from "mobx-react";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import '../css/Header.scss';

const Header = observer(
    (props:any) => {
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
                </div>
            </div>
        )
    }
)

export default Header;