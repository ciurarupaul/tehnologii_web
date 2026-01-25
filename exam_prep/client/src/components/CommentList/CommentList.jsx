import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllComments } from "../../stores/actions/comment-actions";
import Comment from "./Comment/Comment";
import "./CommentList.css";

const commentDataSelector = (state) => state.comment.data;
const userIdSelector = (state) => state.user.data.id;

export default function CommentList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const comments = useSelector(commentDataSelector);
  const userId = useSelector(userIdSelector);

  useEffect(() => {
    if (!userId || !params.tid) {
      return;
    }

    const loadComments = async () => {
      const action = await getAllComments(userId, params.tid);
      dispatch(action);
    };

    loadComments();
  }, [dispatch, userId, params.tid]);

  return (
    <div>
      <h1>Comment List</h1>
      <table>
        <thead></thead>
        <tbody>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </tbody>
      </table>

      <div className="footer">
        <button onClick={() => navigate(`new`)}>Create Comment</button>
      </div>
    </div>
  );
}
