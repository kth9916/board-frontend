import {observer} from "mobx-react";
import React, {useEffect} from "react";
import '../../css/TextArea.scss'
import axios from "axios";

const TextArea = observer(
    (props: any) => {

        return (
            <div className="textArea-wrapper">
                {props.isEdit === 'edit' ? '' :
                    <select onChange={props.handleChange} defaultValue='default' style={{marginBottom: '0.7rem'}}>
                        <option value='default' disabled>게시판을 선택하세요</option>
                        <option key='1' value='1'>일반 게시판</option>
                        <option key='2' value='2'>공지 게시판</option>
                        <option key='3' value='3'>FAQ 게시판</option>
                        <option key='4' value='4'>Q&A 게시판</option>
                    </select>}
                <input
                    onChange={(e) => {
                        props.setTitle(e.target.value);
                    }}
                    className="title"
                    placeholder="제목을 입력하세요"
                    defaultValue={props.isEdit === 'edit' ? props.prevTitle : props.title}
                />
                <textarea
                    onChange={(e) => {
                        props.setContent(e.target.value);
                    }}
                    className="text"
                    placeholder="내용을 입력하세요"
                    defaultValue={props.isEdit === 'edit' ? props.prevContent : props.content}
                />
            </div>
        )
    }
)

export default TextArea