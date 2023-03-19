import {atom, useAtom} from "jotai";
import axios from "axios";
import {boardAtom, memberAtom} from "../../../AppContainer";
import {useEffect} from "react";
import {Form} from "react-router-dom";
import TextArea from "../../components/TextArea";
import '../../../css/CommentList.css'

interface Comment{
    id: string;
    boardId: string;
    userId: string;
    userName: string;
    commentContent: string;
    registeredDate: string;
}



export const commentsAtom = atom<Comment[]>([]);
export const commentContentAtom = atom('');


const CommentList = () => {
    const [board, setBoard] = useAtom(boardAtom);
    const [comments, setComments] = useAtom(commentsAtom);
    const [commentContent, setCommentContent] = useAtom(commentContentAtom);
    const [member, setMember] = useAtom(memberAtom);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const res = await axios.post('/comment/create', {
                boardId: board._id,
                userId: member.account,
                userName: member.name,
                commentContent: commentContent,
            });
            setComments((prevComments) => [...prevComments, res.data]);
            setCommentContent('');
        }catch (err){
            console.error(err);
        }
    }

    const handleDelete = async (comment: Comment) => {
        if(!window.confirm("정말 삭제하시겠습니까?")){
            return;
        }

        try {
            await axios.delete(`/comment/deleteById/${comment.id}`);
            setComments((prev) => prev.filter((c) => c.id !== comment.id));
        }catch (err){
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`comment/findByBoardId/${board._id}`);
                setComments(res.data);
            }catch (err){
                console.error(err);
            }
        };
        fetchComments();
    },[board, setComments]);


    return(
        <div className='comment-wrapper'>
            <form onSubmit={handleSubmit} className='comment-form'>
                <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="댓글을 입력하세요"
                    required
                    />
                {member.account != '' ? <button type='submit'>작성</button> :''}
            </form>
            {comments.map((comment) => (
                <div key={comment.id} className='comment-item'>
                    <span className='comment-username'>{comment.userName}</span>
                    <br/>
                    <span className='comment-date'>{comment.registeredDate}</span>
                    {member.account === comment.userId  &&(
                        <button
                            className='comment-delete-btn'
                            onClick={() => handleDelete(comment)}
                            >
                            삭제
                        </button>
                    )}
                    <div className='comment-content'>{comment.commentContent}</div>
                </div>
                ))}
        </div>
    );
};

export default CommentList;





