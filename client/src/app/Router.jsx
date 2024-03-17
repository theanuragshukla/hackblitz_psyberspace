import { Route, Routes } from "react-router-dom";
import { ROUTES, SIDEBAR_ROUTES } from "../constants";
import AiChat from "./components/AiChat";
import Appointments from "./components/Appointments";
import Community from "./components/Community";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import Mindfullness from "./components/Mindfullness";
import Signup from "./components/Signup";
import Therapists from "./components/Therapists";
import VideoChat from "./components/VideoChat";
import DashLayout from "./layouts/DashLayout";
import HomeLayout from "./layouts/HomeLayout";
import UpdateForm from "./components/UpdateForm";

export default function Router() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
      </Route>
      <Route element={<DashLayout />}>
        <Route path={SIDEBAR_ROUTES.home} element={<Dashboard />} />
        <Route path={SIDEBAR_ROUTES.appointments} element={<Appointments />} />
        <Route path={SIDEBAR_ROUTES.therepists} element={<Therapists />} />
        <Route path={SIDEBAR_ROUTES.mindfullness} element={<Mindfullness />} />
        <Route path={SIDEBAR_ROUTES.community} element={<Community />} />
        <Route path={SIDEBAR_ROUTES.ai} element={<AiChat/>} />
        <Route path={SIDEBAR_ROUTES.video} element={<VideoChat/>} />
        <Route path={SIDEBAR_ROUTES.update} element={<UpdateForm/>} />
      </Route>
    </Routes>
  );
}
