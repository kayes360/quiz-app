import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
 
 
import React from 'react'

export default function RootLayout() {
  return (
    <div className="container mx-auto py-3">
      <Header />
      
      <main className="bg-white p-6 rounded-md h-full">
         <Outlet/>
      </main>

      <Footer />
    </div>
  )
}
