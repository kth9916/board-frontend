
import React from "react";
import {useNavigate} from "react-router-dom";
import '../css/Card.scss'

interface Props{
    key: string,
    date: string,
    title: string,
    content: string,
    _id: string,
    userName: string
}

const Card = ({key, date, title, content, _id, userName}:Props) => {
        const navigate = useNavigate();
        return (
            <div className='card-wrapper' onClick={() => {
                navigate(`/board/detail/${_id}`)
            }}>
                <div className='card-body-text'>
                    <div className='card-body-text-title'>{title}</div>
                    <hr/>
                    <div className='card-body-text-title'>작성자 {userName}</div>
                    <div className='card-body-text-content'>{content}</div>
                </div>
                <div className='card-footer'>
                    <div className='date'>{date}</div>
                </div>
            </div>
        )
    }


export default Card;