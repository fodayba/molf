import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'

// Inner pages load on demand so the first visit downloads less, which matters on mobile data.
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({ Component: (await load()).default })

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'about', lazy: page(() => import('./pages/About.tsx')) },
      { path: 'programmes', lazy: page(() => import('./pages/Programs.tsx')) },
      { path: 'news', lazy: page(() => import('./pages/News.tsx')) },
      { path: 'news/:slug', lazy: page(() => import('./pages/NewsPost.tsx')) },
      { path: 'get-involved', lazy: page(() => import('./pages/GetInvolved.tsx')) },
      { path: 'donate', lazy: page(() => import('./pages/Donate.tsx')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact.tsx')) },
      { path: '*', lazy: page(() => import('./pages/NotFound.tsx')) },
    ],
  },
])
