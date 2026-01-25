import { useDispatch, useSelector } from "react-redux";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import AuthGuard from "../AuthGuard";
import Dashboard from "../Dashboard";
import ErrorDisplay from "../ErrorDisplay";
import LoginForm from "../LoginForm";
import ProjectForm from "../ProjectForm/ProjectForm";
import ProjectList from "../ProjectList";
import TaskDetails from "../TaskDetails";
import TaskForm from "../TaskForm";
import TaskList from "../TaskList";

import { logout } from "../../stores/actions/user-actions";
import CommentList from "../CommentList/CommentList";
import Comment from "../CommentList/Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";

// selectors
const userDataSelector = (state) => state.user.data;

const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector(userDataSelector);

  const isAuthenticated = !!userData.token;

  const handleLogout = async () => {
    const action = await logout();
    dispatch(action);
  };

  return (
    <div className="app">
      {isAuthenticated && (
        <div className="app-header">
          <div>
            <h5>Welcome, {userData.email}</h5>
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}

      <ErrorDisplay />

      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />

          <Route
            path="/"
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <Dashboard />
              </AuthGuard>
            }
          />

          <Route
            path="/projects"
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <ProjectList />
              </AuthGuard>
            }
          />

          <Route
            path="/projects/new"
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <ProjectForm />
              </AuthGuard>
            }
          />
          <Route
            path="/projects/:pid/tasks"
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <TaskList />
              </AuthGuard>
            }
          />
          <Route
            path="/projects/:pid/tasks/new"
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <TaskForm />
              </AuthGuard>
            }
          />
          <Route
            path="/projects/:pid/tasks/:tid"
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <TaskDetails />
              </AuthGuard>
            }
          />
          <Route
            path="/projects/:pid/tasks/:tid/comments"
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <CommentList />
              </AuthGuard>
            }
          />
          <Route
            path="/projects/:pid/tasks/:tid/comments/new"
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <CommentForm />
              </AuthGuard>
            }
          />
          <Route
            path="/projects/:pid/tasks/:tid/comments/:cid"
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <Comment />
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
