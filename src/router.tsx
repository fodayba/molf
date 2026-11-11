import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import Donate from './pages/Donate.tsx'
import GetInvolved from './pages/GetInvolved.tsx'
import Home from './pages/Home.tsx'
import News from './pages/News.tsx'
import NewsPost from './pages/NewsPost.tsx'
import NotFound from './pages/NotFound.tsx'
import Programs from './pages/Programs.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'programmes', Component: Programs },
      { path: 'news', Component: News },
      { path: 'news/:slug', Component: NewsPost },
      { path: 'get-involved', Component: GetInvolved },
      { path: 'donate', Component: Donate },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
])
