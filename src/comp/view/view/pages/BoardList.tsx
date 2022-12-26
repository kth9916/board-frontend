import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import Card from "../../UI/Card";
import {Pagination} from "@mui/material";
import axios from "axios";
import {useParams} from "react-router";
import '../../css/BoardList.scss'
import usePagination from "../../UI/Pagination";


const BoardList = observer(
    (props: any) => {

        const [boardList, setBoardList] = useState<{ _id: string, title: string, userName : string, content: string, boardKind: number, registeredDate: string }[]>([]);
        let [page, setPage] = useState(1);

        const boardKind = useParams().boardKind;
        let num = Number(boardKind);

        const PER_PAGE = 4;

        const count = Math.ceil(props.posts.length / PER_PAGE);

        const _DATA = usePagination(boardList, PER_PAGE);

        const handleChange = (e: any, p: number) => {
            setPage(p);
            _DATA.jump(p);
        };

        useEffect(() => {
            // 페이지에 해당하는 게시물 가져오기
            const getBoardList = async () => {
                const {data} = await axios.get(`/board/findByBoardKind/${num}`);
                return data;
            }
            // 현재 페이지에 해당하는 게시물로 상태 변경하기
            getBoardList().then(result => setBoardList(sortJson(result, 'registeredDate', 'desc')));
        }, [num])

        const sortJson = (data : any, key : any, type : string) => {
            if(type == undefined){
                type='asc';
            }
            return data.sort((a : any, b : any) => {
                let x = a[key];
                let y = b[key];

                if(type == 'desc'){
                    return x> y ? -1 : x < y ? 1 : 0;
                }else if(type == 'asc'){
                    return x < y ? -1 : x > y ? 1 : 0;
                }
            });
        }


        return (
            <div className="boardList-wrapper">
                <div className="boardList-header">
                    전체 게시물 📝
                </div>
                <div className="boardList-body">
                    {_DATA.currentData().map((item : { _id: string, title: string, userName : string, content: string, boardKind: number, registeredDate: string }, index) => (
                        <Card key={item._id} date={item.registeredDate.toString()}
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