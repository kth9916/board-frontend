import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import Card from "../../UI/Card";
import {Pagination} from "@mui/material";
import axios from "axios";
import {useParams} from "react-router";
import '../../css/BoardList.scss'
import usePagination from "../../UI/Pagination";
import BoardRdo from "../../../api/feature/board/api-model/BoardRdo";


const BoardList = observer(
    (props: any) => {

        let [page, setPage] = useState(1);

        const PER_PAGE = 8;

        const count = Math.ceil(props.boardList.length / PER_PAGE);

        const _DATA = usePagination(props.boardList, PER_PAGE);

        console.log(props.boardList);

        const handleChange = (e: any, p: number) => {
            setPage(p);
            _DATA.jump(p);
        };

        const boardKind = useParams().boardKind;
        let num = Number(boardKind);

        useEffect(() => {
            // 페이지에 해당하는 게시물 가져오기
            props.getBoardList(num);
            props.getBoardListName(boardKind);
        }, [num])




        return (
            <div className="boardList-wrapper">
                <div className="boardList-header">
                    {props.boardListName} 📝
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
)

export default BoardList;