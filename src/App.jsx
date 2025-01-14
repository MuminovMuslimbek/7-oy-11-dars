import React, { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ArticleList from './pages/ArticleList'
import ArticleDetail from './pages/ArticleDetail'
import CreateArticle from './pages/CreateArticle'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import Users from './pages/Users'

export const IsLogin = createContext(null)
export const ThemeContext = createContext(null)

function App() {
  const [islogin, setIslogin] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const body = document.body;
    if (theme === 'light') {
      body.classList.remove('dark');
      body.classList.add('light');
    } else {
      body.classList.remove('light');
      body.classList.add('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <IsLogin.Provider value={{ islogin, setIslogin }} >
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Routes>
          <Route index element={<MainLayout><Home /></MainLayout>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/users' element={<MainLayout><Users /></MainLayout>} />
          <Route path='/article-list' element={<MainLayout><ArticleList /></MainLayout>} />
          <Route path='/article/:id' element={<MainLayout><ArticleDetail /></MainLayout>} />
          <Route path='/create-article' element={<MainLayout><CreateArticle /></MainLayout>} />
          <Route path='*' element={<MainLayout><ErrorPage /></MainLayout>} />
        </Routes>
      </ThemeContext.Provider>
    </IsLogin.Provider>
  )
}

export default App