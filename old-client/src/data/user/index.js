import { getClient } from "../client";

export const reqModal = async (func) => {
  try {
    const { status, data } = await func();
    if (status === 200) {
      return data;
    } else {
      return {
        status: false,
        msg: `request failed with code ${status}`,
      };
    }
  } catch (e) {
    return {
      status: false,
      msg: "Something Unexpected happened",
    };
  }
};

export const signup = (values) => {
  return reqModal(() => getClient().post("/auth/signup", values));
};

export const login = (values) => {
  return reqModal(() => getClient().post("/auth/login", values));
};

export const profile = () => {
  return reqModal(() => getClient().get("/user"));
};

export const getProfile = (id) => {
  return reqModal(() => getClient().get(`/user/${id}`));
};

export const updateProfile = (values) => {
  return reqModal(() => getClient().put("/user", values));
};
