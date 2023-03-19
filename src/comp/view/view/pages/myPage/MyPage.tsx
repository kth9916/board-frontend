import {useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {
    boardKindAtom,
    boardListAtom,
    boardListNameAtom,
    memberAtom,
    myBoardListAtom, myBoardListNameAtom,
    postsAtom
} from "../../../AppContainer";
import {useQuery} from "react-query";
import BoardRdo from "../../../../api/feature/board/api-model/BoardRdo";
import React, {useEffect, useState} from "react";
import usePagination from "../../../UI/Pagination";
import Card from "../../../UI/Card";
import {Pagination} from "@mui/material";
import '../../../css/BoardList.scss'


interface Props{
    findByUserIdAndBoardKind: (userId: string, boardKind: number) => void,
    getMyBoardListName: (boardKind: string) => void,
    handleBoardKindChange: (e:any) => void,
    findByUserId: (userId: string) => void,
}

const MyPage = ({findByUserIdAndBoardKind, getMyBoardListName, handleBoardKindChange, findByUserId}:Props) => {
    //

    const navigate = useNavigate();
    const PER_PAGE = 8;
    const [posts, setPosts] = useAtom(postsAtom);
    const [atomMyBoardListAtom, setAtomMyBoardListAtom] = useAtom(myBoardListAtom);
    const [myBoardListName, setMyBoardListName] = useAtom(myBoardListNameAtom);
    const [member, setMember] = useAtom(memberAtom);
    const [boardKind, setBoardKind] = useAtom(boardKindAtom);
    const boardKindNum = Number(boardKind);

    let [page, setPage] = useState(1);

    const count = Math.ceil(atomMyBoardListAtom.length / PER_PAGE);
    const _DATA = usePagination(atomMyBoardListAtom, PER_PAGE);

    const handleChange = (e: any, p: number) => {
        setPage(p);
        _DATA.jump(p);
    };

    useEffect(() => {
        findByUserIdAndBoardKind(member.account, boardKindNum);
        getMyBoardListName(boardKind);
        console.log(member.account);
    }, [boardKind])

    useEffect(() => {
        findByUserId(member.account);
    },[])

    return(
        <div className="boardList-wrapper">
            <div className="boardList-header">
                {member.name}의 마이 페이지 📝
            </div>
            <div>
                <select onChange={handleBoardKindChange} defaultValue='default' style={{marginBottom: '0.7rem'}}>
                    <option value='default' disabled>게시판을 선택하세요</option>
                    <option key='1' value='1'>일반 게시판</option>
                    <option key='2' value='2'>공지 게시판</option>
                    <option key='3' value='3'>FAQ 게시판</option>
                    <option key='4' value='4'>Q&A 게시판</option>
                </select>
            </div>
            <div className="boardList-header">
                {myBoardListName} 📝
            </div>
            <div className="boardList-body">
                {_DATA.currentData().map((item : BoardRdo, index) => (
                    <Card key={item._id} date={item.registeredDate}
                          title={item.title} content={item.content}
                          _id={item._id} userName={item.userName}
                    />
                ))}
            </div>
            <div className="boardList-footer">
                <Pagination
                    variant="outlined" color="primary" page={page}
                    count={count} size="large"
                    onChange={handleChange}
                    showFirstButton showLastButton
                />
            </div>
        </div>
    )
}

export default MyPage;