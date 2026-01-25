import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../../stores/actions/project-actions";
import Paginator from "../Paginator/Paginator";
import Project from "./Project";
import "./ProjectList.css";

// selectors
const projectDataSelector = (state) => state.project.data;
const projectCountSelector = (state) => state.project.count;
const userIdSelector = (state) => state.user.data.id;

const ProjectList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projects = useSelector(projectDataSelector);
  const totalRecords = useSelector(projectCountSelector);
  const userId = useSelector(userIdSelector);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    if (!userId) {
      return;
    }

    const loadProjects = async () => {
      const action = await getAllProjects(userId, {
        pageNumber,
        pageSize,
        filterField,
        filterValue,
        sortField,
        sortOrder,
      });
      dispatch(action);
    };

    loadProjects();
  }, [
    dispatch,
    userId,
    pageNumber,
    pageSize,
    filterField,
    filterValue,
    sortField,
    sortOrder,
  ]);

  return (
    <div className="project-list">
      <h1>Project List</h1>
      <table>
        <thead>
          <tr>
            <th>
              <div>Name</div>
              <input
                type="text"
                onChange={(e) => {
                  setFilterValue(e.target.value);
                  setFilterField("name");
                }}
                placeholder="name filter"
              />
              <button
                onClick={() => {
                  setSortField("name");
                  setSortOrder("asc");
                }}
              >
                ⌃
              </button>
              <button
                onClick={() => {
                  setSortField("name");
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
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </tbody>
      </table>
      <Paginator
        onPageChange={(pageNumber) => setPageNumber(pageNumber)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
        totalRecords={totalRecords}
      />
      <div className="footer">
        <button onClick={() => navigate("/projects/new")}>
          Create Project
        </button>
      </div>
    </div>
  );
};

export default ProjectList;
