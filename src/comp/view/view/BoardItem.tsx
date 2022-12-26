import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useNavigate} from "react-router-dom";

const BoardItem = observer(
    () => {
        // const [post, setPost] = useState<{ _id: string, title: string, userName : string, content: string, boardKind: number, registeredDate: string }>();

        const _id = useParams()._id;
        const navigate = useNavigate();


        return(

            <div>
                <h3>{_id} 상품 페이지입니다.</h3>
                <ul>
                    <li><button onClick={() => navigate(-2)}>Go 2 pages back</button></li>
                    <li><button onClick={() => navigate(-1)}>Go back</button></li>
                    <li><button onClick={() => navigate(1)}>Go forward</button></li>
                    <li><button onClick={() => navigate(2)}>Go 2 pages forward</button></li>
                    <li><button onClick={() => navigate('/')}>Go Root</button></li>
                    <li><button onClick={() => navigate('/', {replace: true})}>Go Root</button></li>
                </ul>
            </div>
        )
    }
)

export default BoardItem;