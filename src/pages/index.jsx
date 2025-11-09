import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import Home from "./Home";
import Participantes from "./Participantes";
import Registro from "./Registro";
import Gafete from "./Gafete";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/participantes",
        element: <Participantes />,
      },
      {
        path: "/registro",
        element: <Registro />,
      },
      {
        path: "/gafete/:idParticipante",
        element: <Gafete />,
      },
    ],
  },
]);
