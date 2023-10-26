import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import MainLayout from './loayouts/main';
import Reports from './routes/reports';
import CompanyReport from './routes/company-report';
const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: 'reports',
        element: <Reports />,
        children: [
          {
            path:'company', element: <CompanyReport />
          },
          {
            path: '*', element: 'Not found'
          }
        ]
      },
      {
        path: '*',
        element: 'Not found'
      }
    ]
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
