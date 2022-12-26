import {observer} from "mobx-react";
import {useParams} from "react-router";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {Button} from "@mui/material";
import TextArea from "../components/TextArea";
import {useNavigate} from "react-router-dom";

const EditBoard = observer(
    () => {

        const navigate = useNavigate();

        const _id = useParams().id;
        const [title, setTitle] = useState("");
        const [content, setContent] = useState("");
        const [isEdit, setIsEdit] = useState('edit');
        const [boardKind, setBoardKind] = useState(0);

        useEffect(() => {
            const getBoard = async () => {
                const {data} = await axios.get(`/board/findById/${_id}`);
                return data;
            }
            getBoard().then((result) => {
                setTitle(result.title);
                setContent(result.content);
            });
        }, [])

        const canSubmit = useCallback(() => {
            return content !== "" && title !== "";
        }, [title, content]);

        const handleSubmit = useCallback(async () => {
            try {

                await axios.put(`/board/modifyById/${_id}`, {
                    title: title,
                    content: content,
                    id: _id,
                    boardKind: boardKind,
                });
                window.alert("😎수정이 완료되었습니다😎");
                navigate(`/board/detail/${_id}`);
            } catch (e) {
                toast.error("오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭", {
                    position: "top-center",
                });
            }
        }, [canSubmit])

        return (
            <div className="addBoard-wrapper">
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
                            제목과 내용을 모두 입력하세요😭
                        </Button>
                    )}
                </div>
                <div className="addBoard-body">
                    <TextArea setTitle={setTitle} setContent={setContent} title={title} content={content}
                              isEdit={isEdit} setBoardKind={setBoardKind} boardKind={boardKind} id={_id}/>
                </div>
            </div>
        )
    }
)
export default EditBoard;