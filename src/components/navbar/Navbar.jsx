import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <Link to='/' className='nav-link'>
          <img src = '/FDA.png' alt='FDA logo' className='logo-navbar' />
        </Link>
      </nav>
    </>
  )
}

export default Navbar