import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './login/Login.tsx'
import CreateUser from './login/CreateUser.tsx'
import Panel from './expenses/Panel.tsx'
import Dashboard from './expenses/dashboard/Dashboard.tsx'
import MyMoney from './expenses/myMoney/index.tsx'
import MyAccount from './expenses/myAccount/index.tsx'

const router = createBrowserRouter([
  {
    path: '/', //pagina home é para logar
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: 'create-user',
        element: <CreateUser />,
      },
    ],
  },
  {
    path: '/expenses',
    element: <Panel />,
    children: [
      {
        path: '/expenses/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/expenses/mymoney',
        element: <MyMoney />,
      },
      {
        path: '/expenses/myaccount',
        element: <MyAccount />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
