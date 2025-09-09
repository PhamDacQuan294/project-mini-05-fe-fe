import PrivateRouters from "../components/PrivateRouters";
import LayoutDefault from "../layout/LayoutDefault";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Answers from "../pages/Answers";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import Topic from "../pages/Topic";
import Logout from "../pages/Logout";


export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />
      }, 
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        element: <PrivateRouters />,
        children: [
          {
            path: "answer",
            element: <Answers />
          },
          {
            path: "quiz/:id",
            element: <Quiz />
          },
          {
            path: "result/:id",
            element: <Result />
          },
          {
            path: "topic",
            element: <Topic />
          },
        ]
      }
    ]
  }
];

/*
Trang answers la private, nguoi ta dang nhap vao thi moi co cau tra loi
*/ 