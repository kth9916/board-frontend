
import {useParams} from "react-router";
import {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Button} from "@mui/material";
import TextArea, {TextAreaProps} from "../components/TextArea";
import {useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {antenaAtom, boardAtom, boardKindAtom, contentAtom, titleAtom} from "../../AppContainer";

interface Props extends TextAreaProps{
    boardEdit: (title: string, content: string, _id: string) => void,
    getBoard:(_id: string) => void,
}

const EditBoard = ({boardEdit, getBoard}:Props) => {

        const [board, setBoard] = useAtom(boardAtom);
        const [antenta, setAntena] = useAtom(antenaAtom);

        const navigate = useNavigate();

        const _id = useParams().id;
        const [title, setTitle] = useAtom(titleAtom);
        const [content, setContent] = useAtom(contentAtom);
        const [isEdit, setIsEdit] = useState('edit');
        const [boardKind, setBoardKind] = useAtom(boardKindAtom);

        useEffect(() => {
            getBoard(_id ?? 'default Value');
        }, [_id])

        const handleSubmit = useCallback(async () => {
            try {
                boardEdit(title, content, _id ?? 'default value');
                window.alert("😎수정이 완료되었습니다😎");
                navigate(`/board/detail/${_id}`);
            } catch (e) {
                toast.error("오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭", {
                    position: "top-center",
                });
            }finally {
                setTitle('');
                setContent('');
                setAntena(false);
            }
        }, [title, content])

        return (
            <div className="addBoard-wrapper">
                <div style={{border: '3px solid black', width: '50rem', marginBottom: '3rem'}}>
                    <div className="addBoard-header">
                        게시물 수정하기 🖊️
                    </div>
                    <div className="submitButton">
                        {antenta ? (
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
                        <TextArea isEdit={isEdit} id={_id} defaultContent={isEdit === 'edit' ? board.content : ''} defaultTitle={isEdit === 'edit' ? board.title : ''}/>
                    </div>
                </div>
            </div>
        )
    }

export default EditBoard;