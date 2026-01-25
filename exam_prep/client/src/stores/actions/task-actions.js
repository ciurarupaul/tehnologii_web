import store from "../store";
import { SERVER } from "../../config/global";

export const getAllTasks = async (
  userId,
  projectId,
  {
    pageNumber = "",
    pageSize = "",
    filterField = "",
    filterValue = "",
    sortField = "",
    sortOrder = "",
  } = {},
) => {
  const token = store.getState().user.data.token;
  const url =
    `${SERVER}/api/users/${userId}/projects/${projectId}/tasks` +
    `?pageSize=${pageSize || ""}` +
    `&pageNumber=${pageNumber === "" ? 0 : pageNumber}` +
    `&filterField=${filterField || ""}` +
    `&filterValue=${filterValue || ""}` +
    `&sortField=${sortField || ""}` +
    `&sortOrder=${sortOrder || ""}`;

  return {
    type: "GET_ALL_TASKS",
    payload: async () => {
      let response = await fetch(url, {
        headers: {
          authorization: token,
        },
      });

      if (!response.ok) {
        throw response;
      }

      // expected: { data, count }
      return response.json();
    },
  };
};

export const getOneTask = async (userId, projectId, taskId) => {
  const token = store.getState().user.data.token;

  return {
    type: "GET_ONE_TASK",
    payload: async () => {
      const response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}`,
        {
          headers: {
            authorization: token,
          },
        },
      );

      if (!response.ok) {
        throw response;
      }

      // expected: single task object
      return response.json();
    },
  };
};

export const createTask = async (userId, projectId, task) => {
  const token = store.getState().user.data.token;

  return {
    type: "CREATE_TASK",
    payload: async () => {
      let response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify(task),
        },
      );

      if (!response.ok) {
        throw response;
      }

      // refresh list after create
      response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks`,
        {
          headers: {
            authorization: token,
          },
        },
      );

      if (!response.ok) {
        throw response;
      }

      return response.json();
    },
  };
};

export const updateTask = async (userId, projectId, id, task) => {
  const token = store.getState().user.data.token;

  return {
    type: "UPDATE_TASK",
    payload: async () => {
      let response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify(task),
        },
      );

      if (!response.ok) {
        throw response;
      }

      // refresh list after update
      response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks`,
        {
          headers: {
            authorization: token,
          },
        },
      );

      if (!response.ok) {
        throw response;
      }

      return response.json();
    },
  };
};

export const deleteTask = async (userId, projectId, id) => {
  const token = store.getState().user.data.token;

  return {
    type: "DELETE_TASK",
    payload: async () => {
      let response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${id}`,
        {
          method: "delete",
          headers: {
            authorization: token,
          },
        },
      );

      if (!response.ok) {
        throw response;
      }

      // refresh list after delete
      response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks`,
        {
          headers: {
            authorization: token,
          },
        },
      );

      if (!response.ok) {
        throw response;
      }

      return response.json();
    },
  };
};

export const assignTask = async (userId, projectId, taskId, assignedUserId) => {
  const token = store.getState().user.data.token;

  return {
    type: "ASSIGN_TASK",
    payload: async () => {
      let response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/assignments`,
        {
          method: "post",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ assignedTo: assignedUserId }),
        },
      );

      if (!response.ok) {
        throw response;
      }

      // refresh list after assign
      response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks`,
        {
          headers: {
            authorization: token,
          },
        },
      );

      if (!response.ok) {
        throw response;
      }

      return response.json();
    },
  };
};

export const updateTaskStatus = async (userId, projectId, taskId, status) => {
  const token = store.getState().user.data.token;

  return {
    type: "UPDATE_TASK_STATUS",
    payload: async () => {
      let response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/status`,
        {
          method: "put",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      if (!response.ok) {
        throw response;
      }

      // refresh list after status change
      response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks`,
        {
          headers: {
            authorization: token,
          },
        },
      );

      if (!response.ok) {
        throw response;
      }

      return response.json();
    },
  };
};
