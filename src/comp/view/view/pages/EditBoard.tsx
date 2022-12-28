import {observer} from "mobx-react";
import {useParams} from "react-router";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {Button} from "@mui/material";
import TextArea from "../components/TextArea";
import {useNavigate} from "react-router-dom";

const EditBoard = observer(
    (props : any) => {

        const navigate = useNavigate();

        const _id = useParams().id;
        const [title, setTitle] = useState("");
        const [content, setContent] = useState("");
        const [isEdit, setIsEdit] = useState('edit');
        const [boardKind, setBoardKind] = useState(0);

        useEffect(() => {
            props.getBoard(_id);
        }, [_id])

        const canSubmit = useCallback(() => {
            return content !== "" && title !== "";
        }, [title, content]);

        const handleSubmit = useCallback(async () => {
            try {
                await props.boardEdit(title, content,_id);
                window.alert("😎수정이 완료되었습니다😎");
                navigate(`/board/detail/${_id}`);
            } catch (e) {
                toast.error("오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭", {
                    position: "top-center",
                });
            }finally {
                setTitle('');
                setContent('');
            }
        }, [canSubmit])

        return (
            <div className="addBoard-wrapper">
                <div style={{border: '3px solid black', width: '50rem', marginBottom: '3rem'}}>
                    <div className="addBoard-header">
                        게시물 수정하기 🖊️
                    </div>
                    <div className="submitButton">
                        {canSubmit() ? (
                            <Button
                                onClick={handleSubmit}
                                className="success-button"
                                variant="outlined"
                            >
                                수정하기😃
                            </Button>
                        ) : (
                            <Button
                                className="disable-button"
                                variant="outlined"
                                size="large"
                            >
                                제목과 내용 중 모두 수정이 필요합니다.😭
                            </Button>
                        )}
                    </div>
                    <div className="addBoard-body">
                        <TextArea setTitle={setTitle} setContent={setContent} title={title} content={content}
                                  isEdit={isEdit} setBoardKind={setBoardKind} boardKind={boardKind} id={_id}
                                  prevTitle={props.board.title} prevContent={props.board.content}/>
                    </div>
                </div>
            </div>
        )
    }
)
export default EditBoard;