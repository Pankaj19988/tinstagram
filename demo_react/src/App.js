import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.scss'
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PostPage from "./pages/PostPage";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import People from "./pages/People";

const withLayout = (ele) => {
  return <Layout>{ele}</Layout>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "sign_up",
    element: <SignUp />,
  },
  {
    path: "sign_in",
    element: <SignIn />,
  },
  {
    path: "posts",
    element: withLayout(<PostPage />),
  },
  {
    path: "profile",
    element: withLayout(<Profile />),
  },
  {
    path: "people",
    element: withLayout(<People/>),
  }
]);

createRoot(document.getElementById("root")).render(

);

const App = () => <div>
  <RouterProvider router={router} />
  <ToastContainer />
</div>

export default App;
