import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/pages/app-layout'
import Landingpage from './layouts/pages/landing';
import Onbording from './layouts/pages/onbording';
// import Joblistening from './layouts/pages/job-listening';
import JobPage from './layouts/pages/job';
import PostJob from './layouts/pages/post-job';

import { ThemeProvider } from './components/ui/theme-provider';
import SavedJobs from './layouts/pages/saved-jobs';
import ProtectedRoute from './components/ui/protected-route';
import Joblistening from './layouts/pages/job-listening';
import MyJobs from './layouts/pages/my-job';

const router = createBrowserRouter([{
  element: <AppLayout /> , 
  children:[
    {
      path: '/' ,
      element : <Landingpage/> , 
    } ,
    {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onbording />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <Joblistening/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage/>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
function App() {
  
 return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App
