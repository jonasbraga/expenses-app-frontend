import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Login from "./login/Login.tsx"
import CreateUser from "./login/CreateUser.tsx"
import Dashboard from "./expenses/Dashboard.tsx"

const router = createBrowserRouter([
  {
    path: "/", //pagina home é para logar
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "create-user",
        element: <CreateUser />,
      },
    ],
  },
  {
    path: "/expenses", //pagina de gastos
    element: <Dashboard />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
