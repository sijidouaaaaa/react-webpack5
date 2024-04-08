import React from 'react'
import { Link, NavLink } from "react-router-dom"


import { links } from "@/router/links"


import { useState } from "react"

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false)

  return (
    <nav>
      <div className="container nav__container">
        <ul className={`nav__links ${isNavShowing ? "show__nav" : "hide__nav"}`}>
          {
            links.map(({ name, path }, index) => {
              return (
                <li key={index + 'router'}>
                  <NavLink to={path} className={({ isActive }) => isActive ? "active-nav" : ""}
                    onClick={() => setIsNavShowing(prev => !prev)}>
                    {name}
                  </NavLink>
                </li>
              )
            })
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar