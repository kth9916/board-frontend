import {observer} from "mobx-react";
import React from "react";
import {useNavigate} from "react-router-dom";
import '../css/Card.scss'

const Card = observer(
    (props:any) => {
        const navigate = useNavigate();
        return (
            <div className='card-wrapper' onClick={() => {
                navigate(`/board/detail/${props._id}`)
            }}>
                <div className='card-body-text'>
                    <div className='card-body-text-title'>{props.title}</div>
                    <hr/>
                    <div className='card-body-text-title'>작성자 {props.userName}</div>
                    <div className='card-body-text-content'>{props.content}</div>
                </div>
                <div className='card-footer'>
                    <div className='date'>{props.date}</div>
                </div>
            </div>
        )
    }
)

export default Card;