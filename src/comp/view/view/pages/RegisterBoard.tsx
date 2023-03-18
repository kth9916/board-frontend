
import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {Button} from "@mui/material";
import TextArea, {TextAreaProps} from "../components/TextArea";
import '../../css/RegisterBoard.scss'
import {useAtom} from "jotai";
import {boardKindAtom, contentAtom, titleAtom} from "../../AppContainer";

interface Props extends TextAreaProps{
    boardRegister: () =>  Promise<void>,
    canSubmit: () => boolean
}

const RegisterBoard = ({boardRegister, canSubmit, handleChange}:Props) => {

        const [content, setContent] = useAtom(contentAtom);
        const [title, setTitle] = useAtom(titleAtom);
        const [boardKind, setBoardKind] = useAtom(boardKindAtom);

        const navigate = useNavigate();


        const handleSubmit = useCallback(async () => {
            try{
                await boardRegister();
                window.alert("😎등록이 완료되었습니다😎");
                navigate(`/board/${boardKind}`);
            }catch (e){
                toast.error("오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭", {
                    position: "top-center",
                });
            } finally {
                setTitle('');
                setContent('');
            }
        },[canSubmit])


        return(
            <div className="addBoard-wrapper">
                <div style={{border:'3px solid black', width:'50rem', marginBottom:'3rem'}}>
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
                        <TextArea handleChange={handleChange} defaultContent='' defaultTitle=''/>
                    </div>
                </div>
            </div>
        )
    }


export default RegisterBoard;