import {observer} from "mobx-react";
import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {Button} from "@mui/material";
import TextArea from "../components/TextArea";
import '../../css/RegisterBoard.scss'
import boardContainer from "../../BoardContainer";

const RegisterBoard = observer(
    () => {

        const navigate = useNavigate();

        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
        const [userName, setUserName] = useState('');
        const [boardKind, setBoardKind] = useState(0);

        const canSubmit = useCallback(() => {
            return content !== "" && title !== "" && boardKind !== 0 && userName !== "";
        }, [title, content, boardKind, userName]);

        const handleSubmit = useCallback(async () => {
            try{

                await axios.post("/board/registerPost", {
                    title : title,
                    content : content,
                    boardKind : boardKind,
                    userName : userName,
                });
                window.alert("😎등록이 완료되었습니다😎");
                navigate(`/board/${boardKind}`);
            }catch (e){
                toast.error("오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭", {
                    position: "top-center",
                });
            }
        },[canSubmit])

        const handleChange = (e : any) => {
            setBoardKind(e.target.value);
        }


        return(
            <div className="addBoard-wrapper">
                <div className="addBoard-header">
                    게시물 등록하기 🖊️
                </div>
                <div className="submitButton">
                    {canSubmit() ? (
                        <Button
                            onClick={handleSubmit}
                            className="success-button"
                            variant="outlined"
                        >
                            등록하기😃
                        </Button>
                    ) : (
                        <Button
                            className="disable-button"
                            variant="outlined"
                            size="large"
                        >
                            내용을 모두 입력하세요😭
                        </Button>
                    )}
                </div>
                <div className="addBoard-body">
                    <TextArea setTitle={setTitle} setContent={setContent} title={title} content={content} handleChange={handleChange} userName={userName} setUserName={setUserName}/>
                </div>
            </div>
        )
    }
)

export default RegisterBoard;