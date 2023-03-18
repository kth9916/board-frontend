
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import '../../css/Board.scss'
import {Button, Dialog, DialogContent, IconButton} from "@mui/material";
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import {useAtom} from "jotai";
import {boardAtom} from "../../AppContainer";

interface Props{
    getBoard: (_id: string) => void,
    boardDelete:(_id: string) => void
}

const Board = ({getBoard, boardDelete}:Props) => {

        const [board, setBoard] = useAtom(boardAtom);

        // URL 파라미터 받기
        const _id = useParams().id;
        const navigate = useNavigate();

        const [isLoaded, setIsLoaded] = useState(false);

        //Modal이 보이는 여부 상태
        const [show, setShow] = useState(false);

        // board 가져오기
        useEffect(() => {
            getBoard(_id?? 'default value');
            setIsLoaded(true);
        }, [_id])

        return (
            <>
                {isLoaded && <div className='board-wrapper'>

                    <div className="board-header">
                        <div className="board-header-username">작성자 : {board.userName}</div>
                        <div className="date">{board.registeredDate}</div>
                    </div>
                    <hr/>
                    <div className="board-body">
                        <div className="board-title-content">
                            <div className="board-title">{board.title}</div>
                            <div className="board-content">{board.content}</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="edit-delete-button">
                        <Button
                            variant="outlined" color="error" endIcon={<DeleteForeverOutlinedIcon/>}
                            className="delete-button"
                            onClick={() => {
                                setShow(true)
                            }}
                        >
                            삭제
                        </Button>
                        <Button
                            variant="outlined" endIcon={<BuildOutlinedIcon/>}
                            onClick={() => {
                                navigate(`/board/edit-board/${_id}`)
                            }}
                        >
                            수정
                        </Button>
                    </div>
                </div>
                }

                <Dialog open={show}>
                    <DialogContent style={{position: "relative"}}>
                        <IconButton
                            style={{position: "absolute", top: "0", right: "0"}}
                            onClick={() => setShow(false)}
                        >
                            <DisabledByDefaultOutlinedIcon/>
                        </IconButton>
                        <div className="modal">
                            <div className="modal-title"> 정말 삭제하시겠습니까 ?</div>
                            <div className="modal-button">
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={async () => {
                                        setShow(false);
                                        await boardDelete(_id?? 'default value');
                                        alert('게시글이 삭제되었습니다.');
                                        navigate(`/board/${board.boardKind}`);
                                    }}
                                >
                                    예
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => {
                                        setShow(false)
                                    }}
                                >
                                    아니오
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        )
    }


export default Board;