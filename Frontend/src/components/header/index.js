import React from 'react'
import './header.css'



const Header = () => {
  return (
    <div className="header-container">
    <div className="header">
        <div className="header-logo">
            EkeXpnse <i class="fi fi-rr-bank"></i>
        </div>
        <div className="header-button">
            <a href="https://github.com/ekesel?tab=repositories" target="_blank" rel="noopener noreferrer">
            
            <i class="devicon-github-original"></i>
          
                Star
            </a>
        </div>
    </div>
    </div>
  )
}

export default Header;