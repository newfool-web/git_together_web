import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Error from "./components/Error";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
    errorElement: <Error />
  },  
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
