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
                window.alert("πμμ μ΄ μλ£λμμ΅λλ€π");
                navigate(`/board/detail/${_id}`);
            } catch (e) {
                toast.error("μ€λ₯λ°μ! μ΄λͺ¨μ§λ₯Ό μ¬μ©νλ©΄ μ€λ₯κ° λ°μν  μ μμ΅λλ€" + "π­", {
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
                        κ²μλ¬Ό μμ νκΈ° ποΈ
                    </div>
                    <div className="submitButton">
                        {canSubmit() ? (
                            <Button
                                onClick={handleSubmit}
                                className="success-button"
                                variant="outlined"
                            >
                                μμ νκΈ°π
                            </Button>
                        ) : (
                            <Button
                                className="disable-button"
                                variant="outlined"
                                size="large"
                            >
                                μ λͺ©κ³Ό λ΄μ© μ€ λͺ¨λ μμ μ΄ νμν©λλ€.π­
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