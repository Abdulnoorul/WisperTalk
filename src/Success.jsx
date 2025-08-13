import React from 'react'
import "./Success.css"
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Success() {
        
    const location = useLocation();
    const { secret_msg } = location.state;

    return (
      <>
        <div id="successContainer">
          <img src="./WT-main-logo.png" alt="Wisper Talk Logo" id="smainLogo" />
          <p id="stagLine">
            From your phone to theirs unreadable to everyone else
          </p>
          <img src='./s-icon-logo.png' id='sicon' />
            <div id='secForm'>
                <p id='enhead'>Copy your Encrypted Text</p>

                <input id='secText' type='text' value={secret_msg} readOnly/>
            </div>

          <Link id='homeL' to="/">Home</Link>
        </div>
      </>
    );
}

export default Success
