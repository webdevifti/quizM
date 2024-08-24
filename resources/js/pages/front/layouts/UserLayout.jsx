import React from 'react'
import Header from './Header'
import { Sidebar } from './Sidebar'
import Footer from './Footer';

const UserLayout = ({children}) => {
  return (
    <>
        <Header/>
        <Sidebar/>
        {children}
        <Footer/>
    </>
  )
}

export default UserLayout