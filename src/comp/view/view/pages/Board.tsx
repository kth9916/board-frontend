import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import '../../css/Board.scss'
import {Button, Dialog, DialogContent, IconButton} from "@mui/material";
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

const Board = observer(
    (props : any) => {

        // URL 파라미터 받기
        const _id = useParams().id;
        const navigate = useNavigate();

        const [isLoaded, setIsLoaded] = useState(false);

        //Modal이 보이는 여부 상태
        const [show, setShow] = useState(false);

        // board 가져오기
        useEffect(() => {
            props.getBoard(_id);
            setIsLoaded(true);
        }, [_id])

        return (
            <>
                {isLoaded && <div className='board-wrapper'>

                    <div className="board-header">
                        <div className="board-header-username">작성자 : {props.board.userName}</div>
                        <div className="date">{props.board.registeredDate}</div>
                    </div>
                    <hr/>
                    <div className="board-body">
                        <div className="board-title-content">
                            <div className="board-title">{props.board.title}</div>
                            <div className="board-content">{props.board.content}</div>
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
                                        await props.boardDelete(_id);
                                        alert('게시글이 삭제되었습니다.');
                                        navigate(`/board/${props.board.boardKind}`);
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
)

export default Board;