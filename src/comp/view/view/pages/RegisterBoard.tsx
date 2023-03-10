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
    (props : any) => {

        const navigate = useNavigate();


        const handleSubmit = useCallback(async () => {
            try{
                await props.boardRegister();
                window.alert("πλ±λ‘μ΄ μλ£λμμ΅λλ€π");
                navigate(`/board/${props.boardKind}`);
            }catch (e){
                toast.error("μ€λ₯λ°μ! μ΄λͺ¨μ§λ₯Ό μ¬μ©νλ©΄ μ€λ₯κ° λ°μν  μ μμ΅λλ€" + "π­", {
                    position: "top-center",
                });
            } finally {
                props.setTitle('');
                props.setContent('');
            }
        },[props.canSubmit])


        return(
            <div className="addBoard-wrapper">
                <div style={{border:'3px solid black', width:'50rem', marginBottom:'3rem'}}>
                    <div className="addBoard-header">
                        κ²μλ¬Ό λ±λ‘νκΈ° ποΈ
                    </div>
                    <div className="submitButton">
                        {props.canSubmit() ? (
                            <Button
                                onClick={handleSubmit}
                                className="success-button"
                                variant="outlined"
                            >
                                λ±λ‘νκΈ°π
                            </Button>
                        ) : (
                            <Button
                                className="disable-button"
                                variant="outlined"
                                size="large"
                            >
                                λ΄μ©μ λͺ¨λ μλ ₯νμΈμπ­
                            </Button>
                        )}
                    </div>
                    <div className="addBoard-body">
                        <TextArea setTitle={props.setTitle} setContent={props.setContent} title={props.title}
                                  content={props.content}
                                  handleChange={props.handleChange}/>
                    </div>
                </div>
            </div>
        )
    }
)

export default RegisterBoard;