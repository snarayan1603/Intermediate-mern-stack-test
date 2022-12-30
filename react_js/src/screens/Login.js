import axios from 'axios';
import React from 'react'
import { useNavigate } from "react-router-dom"
import Header from '../templates/Header';

export default function Login() {

    const [userDetails, setUserDetails] = React.useState({ userName: "", password: "" })
    const navigate = useNavigate()

    async function submitHandler(e) {
        e.preventDefault()

        let button = document.getElementById("logInButton");
        button.disabled = true;

        try {

            switch (true) {
                case userDetails.userName === "": setUserDetails({ ...userDetails, error: "Kindly enter user name" }); break;
                case userDetails.password === "": setUserDetails({ ...userDetails, error: "Kindly enter password" }); break;

                default: {

                    setUserDetails({ ...userDetails, error: "" });
                    const { data } = await axios.post("/api/users/login", userDetails)
                    // console.log(data.userDetails)
                    localStorage.setItem("userDetails", JSON.stringify(data.userDetails))
                    navigate("/")
                }
            }


        } catch (err) {
            console.log(err)
            setUserDetails({ ...userDetails, error: err.response.data.error });
        }

        button.disabled = false;

    }

    return (

        <div>
            <Header />

            <div className='row center' style={{ flexDirection: "column", marginTop: "2rem" }}>

                <h1>Sign in</h1>

                <form className="form" onSubmit={submitHandler}>

                    {userDetails.error && <span className='error'>{userDetails.error}</span>}

                    <label>Username</label>
                    <input className="input" type="text" placeholder="Enter usernanme" value={userDetails.userName} onChange={(e) => setUserDetails({ ...userDetails, userName: e.target.value })}></input>
                    <label>Password</label>
                    <input className="input" type="password" placeholder="Enter password" value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}></input>
                    <button className="button" id="logInButton">Submit</button>
                </form>

            </div>
        </div>
    )
}
