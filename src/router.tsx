import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import NotFound from "./routes/NotFound";
import UploadCampground from "./routes/UploadCampground";
import UploadImage from "./routes/UploadImage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "campgrounds/",
        children: [
          {
            path: "upload/",
            children: [
              {
                path: "",
                element: <UploadCampground />,
              },
              {
                path: "image/",
                element: <UploadImage />,
              },
            ],
          },
          {
            path: ":campgroundId/",
            element: <Detail />,
          },
        ],
      },
    ],
  },
]);

export default router;
// path: "/:campgroundId",
