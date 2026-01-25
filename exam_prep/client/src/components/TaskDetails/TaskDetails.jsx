import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  assignTask,
  getOneTask,
  updateTaskStatus,
} from "../../stores/actions/task-actions";
import { getAllUserSuggestions } from "../../stores/actions/user-suggestion-actions";
import "./TaskDetails.css";

// selectors
const selectedTaskSelector = (state) => state.task.selectedTask;
const userIdSelector = (state) => state.user.data.id;
const suggestionsSelector = (state) => state.userSuggestion.data;

const TaskDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const task = useSelector(selectedTaskSelector);
  const userId = useSelector(userIdSelector);
  const suggestions = useSelector(suggestionsSelector);

  const [partialEmailMatch, setPartialEmailMatch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // load task details
  useEffect(() => {
    if (!userId || !params.pid || !params.tid) {
      return;
    }

    const loadTask = async () => {
      const action = await getOneTask(userId, params.pid, params.tid);
      dispatch(action);
    };

    loadTask();
  }, [dispatch, userId, params.pid, params.tid]);

  // sync selectedStatus with task status from store
  useEffect(() => {
    if (task) {
      setSelectedStatus(task.status);
    }
  }, [task]);

  // load user suggestions when partialEmailMatch changes
  useEffect(() => {
    if (!partialEmailMatch) {
      return;
    }

    const loadSuggestions = async () => {
      const action = await getAllUserSuggestions(partialEmailMatch);
      dispatch(action);
    };

    loadSuggestions();
  }, [dispatch, partialEmailMatch]);

  const handleStatusUpdate = async () => {
    const action = await updateTaskStatus(
      userId,
      params.pid,
      params.tid,
      selectedStatus,
    );
    dispatch(action);
  };

  const handleAssign = async () => {
    const action = await assignTask(
      userId,
      params.pid,
      params.tid,
      selectedUserId,
    );
    dispatch(action);
  };

  const canEditStatus = task?.assignedToId === userId;
  const canAllocate = task?.permission?.forUser === userId;

  return (
    <div className="task-details">
      <h1>Task Details</h1>

      {canEditStatus && task && (
        <div className="status-editor">
          <h2>Task status</h2>
          <h3>{task.title}</h3>
          <div className="description">{task.description}</div>

          <button onClick={() => navigate("comments/")}>See comments</button>

          <div className="controls">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="open">OPEN</option>
              <option value="closed">CLOSED</option>
            </select>
            <button onClick={handleStatusUpdate}>Update</button>
          </div>
        </div>
      )}

      {canAllocate && task && (
        <div className="task-allocation">
          <h2>Task allocation</h2>
          <div className="description">{task.description}</div>

          <button onClick={() => navigate("comments/")}>See comments</button>

          <div className="controls">
            <input
              type="text"
              value={partialEmailMatch}
              onChange={(e) => setPartialEmailMatch(e.target.value)}
              placeholder="search for user email"
            />
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="" disabled>
                Select your option
              </option>
              {suggestions.map((suggestion) => (
                <option key={suggestion.id} value={suggestion.id}>
                  {suggestion.email}
                </option>
              ))}
            </select>
            <button onClick={handleAssign}>Assign</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
