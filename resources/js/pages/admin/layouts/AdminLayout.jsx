import React from 'react'
import Header from './Header'
import { Sidebar } from './Sidebar'
import Footer from './Footer';

const AdminLayout = ({children}) => {
  return (
    <>
        <Header/>
        <Sidebar/>
        {children}
        <Footer/>
    </>
  )
}

export default AdminLayout