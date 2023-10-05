import React from 'react'

function Logout() {
    if(localStorage.getItem('email') && localStorage.getItem('email')!=null){
        localStorage.removeItem('email');
        window.location.replace('/')
    }
    return (
    <div></div>
  )
}

export default Logout