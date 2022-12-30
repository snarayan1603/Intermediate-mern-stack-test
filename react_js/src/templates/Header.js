import React from 'react'

export default function Header(props) {
    return (
        <div className='row header'>
            <div className='row center'>
                <img style={{ width: "5rem", height: "5rem", borderRadius: "10rem", marginRight: "15px" }} src="https://images.unsplash.com/photo-1524321956859-97d9031fa723?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80" alt="logo"></img>
            </div>

            <span >{props.userName} - Log out</span>
        </div>
    )
}
