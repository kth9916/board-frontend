
import React, {useEffect} from "react";
import '../../css/TextArea.scss'
import {useAtom} from "jotai";
import {antenaAtom, contentAtom, titleAtom} from "../../AppContainer";

export interface TextAreaProps {
    handleChange?: (e: any) => void;
}

interface Props extends TextAreaProps{
    isEdit?: string,
    id?: string | undefined,
    defaultContent?: string,
    defaultTitle?: string,
}

const TextArea = ({handleChange, isEdit, id, defaultContent, defaultTitle}:Props) => {

        const [title, setTitle] = useAtom(titleAtom);
        const [content, setContent] = useAtom(contentAtom);
        const [antena, setAntena] = useAtom(antenaAtom);

        useEffect(() => {
            if(defaultContent){
                setContent(defaultContent);
            }
        }, [defaultContent])

        useEffect(() => {
            if(defaultTitle){
                setTitle(defaultTitle);
            }
        }, [defaultTitle])

        return (
            <div className="textArea-wrapper">
                {isEdit === 'edit' ? '' :
                    <select onChange={handleChange} defaultValue='default' style={{marginBottom: '0.7rem'}}>
                        <option value='default' disabled>게시판을 선택하세요</option>
                        <option key='1' value='1'>일반 게시판</option>
                        <option key='2' value='2'>공지 게시판</option>
                        <option key='3' value='3'>FAQ 게시판</option>
                        <option key='4' value='4'>Q&A 게시판</option>
                    </select>}
                <input
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setAntena(true);
                    }}
                    className="title"
                    placeholder="제목을 입력하세요"
                    defaultValue={defaultTitle || ''}
                />
                <textarea
                    onChange={(e) => {
                        setContent(e.target.value);
                        setAntena(true);
                    }}
                    className="text"
                    placeholder="내용을 입력하세요"
                    defaultValue={defaultContent || ''}
                />
            </div>
        )
    }


export default TextArea