import {observer} from "mobx-react";
import React from "react";

const BoardList = observer(
    (props:any) => {
        return (
            <div>
                {props.post.title}
                <button onClick={() => props.findByTitle(props.post)}>글 보기</button>
            </div>
        )
    }
)

export default BoardList;