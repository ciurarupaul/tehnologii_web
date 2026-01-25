import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllTasks } from "../../stores/actions/task-actions";
import Paginator from "../Paginator/Paginator";
import Task from "./Task";
import "./TaskList.css";

// selectors
const taskDataSelector = (state) => state.task.data;
const taskCountSelector = (state) => state.task.count;
const userIdSelector = (state) => state.user.data.id;

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const tasks = useSelector(taskDataSelector);
  const totalRecords = useSelector(taskCountSelector);
  const userId = useSelector(userIdSelector);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    if (!userId || !params.pid) {
      return;
    }

    const loadTasks = async () => {
      const action = await getAllTasks(userId, params.pid, {
        pageNumber,
        pageSize,
        filterField,
        filterValue,
        sortField,
        sortOrder,
      });
      dispatch(action);
    };

    loadTasks();
  }, [
    dispatch,
    userId,
    params.pid,
    pageNumber,
    pageSize,
    filterField,
    filterValue,
    sortField,
    sortOrder,
  ]);

  return (
    <div className="task-list">
      <h1>Task list</h1>
      <table>
        <thead>
          <tr>
            <th>
              <div>title</div>
              <input
                type="text"
                onChange={(e) => {
                  setFilterValue(e.target.value);
                  setFilterField("title");
                }}
                placeholder="title filter"
              />
              <button
                onClick={() => {
                  setSortField("title");
                  setSortOrder("asc");
                }}
              >
                ⌃
              </button>
              <button
                onClick={() => {
                  setSortField("title");
                  setSortOrder("desc");
                }}
              >
                ⌄
              </button>
            </th>
            <th>
              <div>Description</div>
              <input
                type="text"
                onChange={(e) => {
                  setFilterValue(e.target.value);
                  setFilterField("description");
                }}
                placeholder="description filter"
              />
              <button
                onClick={() => {
                  setSortField("description");
                  setSortOrder("asc");
                }}
              >
                ⌃
              </button>
              <button
                onClick={() => {
                  setSortField("description");
                  setSortOrder("desc");
                }}
              >
                ⌄
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>

      <Paginator
        onPageChange={(pageNumber) => setPageNumber(pageNumber)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
        totalRecords={totalRecords}
      />

      <div className="footer">
        <button onClick={() => navigate(`/projects/${params.pid}/tasks/new`)}>
          Create Task
        </button>
      </div>
    </div>
  );
};

export default TaskList;
