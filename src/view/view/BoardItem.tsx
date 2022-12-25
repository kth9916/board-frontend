import {observer} from "mobx-react";
import React from "react";

const BoardItem = observer(
    (props:any) => {
        return(
            <div>
                <p>제목</p>
                {props.title}
                <p>내용</p>
                {props.content}

            </div>
        )
    }
)

export default BoardItem;