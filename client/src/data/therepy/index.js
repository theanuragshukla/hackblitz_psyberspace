import { getClient } from "../client";
import { reqModal } from "../user";

export const getDoctors = () => {
  return reqModal(() => getClient().get("/therapist"));
};

export const createAppointment = (values) => {
  return reqModal(() => getClient().post("/therapist/appointment", values));
};
