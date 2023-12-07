import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from './login/Login.tsx'
import CreateUser from './login/CreateUser.tsx'
import Panel from './expenses/Panel.tsx'
import Dashboard from './expenses/dashboard/Dashboard.tsx'
import MyMoney from './expenses/myMoney/index.tsx'
import MyAccount from './expenses/myAccount/index.tsx'
import { setupAxiosInterceptors } from './axiosSetup.ts'

function RequireAuth({ children }: { children: JSX.Element }) {
  if (sessionStorage.getItem('token') === null) {
    return <Navigate to="/" replace />
  }

  return children
}

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
    element: (
      <RequireAuth>
        <Panel />
      </RequireAuth>
    ),
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

setupAxiosInterceptors(() => router.navigate('/?expired=1'))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
