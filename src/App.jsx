import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Error from "./components/Error";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path:"",
        element: <Feed />
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path:"connections",
        element: <Connections />
      },
      {
        path:"requests",
        element: <Requests />
      }
    ],
    errorElement: <Error />
  },  
]);

function App() {

  return(
     <Provider store ={appStore}>
        <RouterProvider router={appRouter} />
     </Provider>
  )
}

export default App;
