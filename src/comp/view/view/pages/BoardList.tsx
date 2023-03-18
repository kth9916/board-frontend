
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Card from "../../UI/Card";
import {Pagination} from "@mui/material";
import axios from "axios";
import {useParams} from "react-router";
import '../../css/BoardList.scss'
import usePagination from "../../UI/Pagination";
import BoardRdo from "../../../api/feature/board/api-model/BoardRdo";
import {useQuery} from "react-query";
import {useAtom} from "jotai";
import {boardListAtom, boardListNameAtom, postsAtom} from "../../AppContainer";

interface Props{
    getBoardList: (boardKind: number) => Promise<void>,
    getBoardListName: (boardKind: string) => void,
}

const BoardList = ({getBoardList, getBoardListName }:Props) => {

        const navigate = useNavigate();
        const boardKind = useParams().boardKind;
        const num = Number(boardKind);
        const PER_PAGE = 8;
        const [posts, setPosts] = useAtom(postsAtom);
        const [atomBoardList, setAtomBoardList] = useAtom(boardListAtom);
        const [boardListName, setBoardListName] = useAtom(boardListNameAtom);

        const { data: boardList } = useQuery<BoardRdo[]>(
            "boardList",
            async () => {
                const response = await axios.get(`board/findByBoardKind/${num}`);
                return response.data;
            }
        );


        let [page, setPage] = useState(1);

        const count = Math.ceil(atomBoardList.length / PER_PAGE);
        const _DATA = usePagination(atomBoardList, PER_PAGE);

        const handleChange = (e: any, p: number) => {
                setPage(p);
                _DATA.jump(p);
        };

        useEffect(() => {
            // 페이지에 해당하는 게시물 가져오기
            getBoardList(num);
            getBoardListName(boardKind?? 'default-value');
        }, [num])

        return (
            <div className="boardList-wrapper">
                <div className="boardList-header">
                    {boardListName} 📝
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


export default BoardList;