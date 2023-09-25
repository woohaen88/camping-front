import {createBrowserRouter} from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "campgrounds/:campgroundId",
                element: <Detail />
            }
        ]
    }
])

export default  router;