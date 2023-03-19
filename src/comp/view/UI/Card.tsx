
import React from "react";
import {useNavigate} from "react-router-dom";
import '../css/Card.scss'
import {useAtom} from "jotai";
import {boardAtom, imagePathAtom} from "../AppContainer";

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
        const [imagePath, setImagePath] = useAtom(imagePathAtom);
        const [board, setBoard] = useAtom(boardAtom);
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
                <div className='card-body-img'>
                    {board._id === _id && board.image && <img src={imagePath} alt={board.title}/>}
                </div>
                <div className='card-footer'>
                    <div className='date'>{date}</div>
                </div>
            </div>
        )
    }


export default Card;