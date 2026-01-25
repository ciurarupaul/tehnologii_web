import store from "../store";
import { SERVER } from "../../config/global";

// options: { pageNumber, pageSize, filterField, filterValue, sortField, sortOrder }
export const getAllProjects = async (
  userId,
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
    `${SERVER}/api/users/${userId}/projects` +
    `?pageSize=${pageSize || ""}` +
    `&pageNumber=${pageNumber === "" ? 0 : pageNumber}` +
    `&filterField=${filterField || ""}` +
    `&filterValue=${filterValue || ""}` +
    `&sortField=${sortField || ""}` +
    `&sortOrder=${sortOrder || ""}`;

  return {
    type: "GET_ALL_PROJECTS",
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

export const createProject = async (userId, project) => {
  const token = store.getState().user.data.token;

  return {
    type: "CREATE_PROJECT",
    payload: async () => {
      let response = await fetch(`${SERVER}/api/users/${userId}/projects`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        throw response;
      }

      // refresh list after create, just like the old store did this.getAll(state)
      response = await fetch(`${SERVER}/api/users/${userId}/projects`, {
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

export const updateProject = async (userId, id, project) => {
  const token = store.getState().user.data.token;

  return {
    type: "UPDATE_PROJECT",
    payload: async () => {
      let response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify(project),
        },
      );
      if (!response.ok) {
        throw response;
      }

      // refresh list after update
      response = await fetch(`${SERVER}/api/users/${userId}/projects`, {
        headers: {
          authorization: token,
        },
      });
      if (!response.ok) {
        throw response;
      }

      return response.json();
    },
  };
};

export const deleteProject = async (userId, id) => {
  const token = store.getState().user.data.token;

  return {
    type: "DELETE_PROJECT",
    payload: async () => {
      let response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${id}`,
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
      response = await fetch(`${SERVER}/api/users/${userId}/projects`, {
        headers: {
          authorization: token,
        },
      });
      if (!response.ok) {
        throw response;
      }

      return response.json();
    },
  };
};
