import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateTask, deleteTask } from "../../../stores/actions/task-actions";

// selectors
const userIdSelector = (state) => state.user.data.id;

const Task = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const userId = useSelector(userIdSelector);

  const canEdit = userId === task.permission?.forUser;

  const handleSave = async () => {
    const action = await updateTask(userId, params.pid, task.id, {
      title,
      description,
    });
    dispatch(action);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const action = await deleteTask(userId, params.pid, task.id);
    dispatch(action);
  };

  return (
    <tr>
      {canEdit ? (
        isEditing ? (
          <>
            <td>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button onClick={() => setIsEditing(false)}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </td>
          </>
        ) : (
          <>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.status}</td>
            <td>{task.assignedTo ? task.assignedTo.email : "unassigned"}</td>
            <td>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <button
                onClick={() => {
                  navigate(`/projects/${params.pid}/tasks/${task.id}`);
                }}
              >
                Details
              </button>
            </td>
          </>
        )
      ) : (
        <>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.status}</td>
          <td>{task.assignedTo ? task.assignedTo.email : "unassigned"}</td>
          <td>
            <button
              onClick={() => {
                navigate(`/projects/${params.pid}/tasks/${task.id}`);
              }}
            >
              Details
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default Task;
