
import React, { Component } from 'react';

import Home from '../src/pages/home/index'
import About from '../src/pages/about/index'
import Contact from '../src/pages/contact/index'
import NavBar from '../src/components/NavBar/index'
import NotFound from '../src/pages/notFound/not_found'

import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
