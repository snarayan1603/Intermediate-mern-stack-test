import React, { useState } from 'react'
import axios from "axios";
import Header from '../templates/Header';
import EmployeeList from '../templates/EmployeeList';
import CreateEmployee from '../templates/CreateEmployee';

export default function HomeScreen() {

    // defining state variable for username and setting initial value to empty
    const [userDetails, setUserDetails] = useState(localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : {})

    const [contentChanger, setContentChanger] = React.useState("")

    const [updateEmployee, setUpdateEmployee] = React.useState({})

    //defining naviagate used for changing the screen or content of the page as per ur    

    const [employeeData, setEmployeeData] = React.useState([])
    const [employeeError, setEmployeeError] = React.useState("")
    const [refresh, setRefresh] = React.useState(true)

    React.useEffect(() => {
        getEmployeeList()
    }, [])

    async function getEmployeeList() {

        try {

            const { data } = await axios.post("/api/admin/get")
            console.log(data)
            setEmployeeData(data.employeeData)
            setRefresh(!refresh)

        } catch (err) {
            console.log(err)
            setEmployeeError(err.response.data.error ? err.response.data.error : err.message)
        }
    }

    function updateEmployeeFunc(data) {
        setContentChanger("update employee")
        setUpdateEmployee(data)
    }

    return (
        <div>
            <Header userName={userDetails.userName}></Header>

            <div className='mainDiv'>

                <div className='sideBar'>

                    <ul>
                        <li onClick={() => setContentChanger("employee list")}>Employee List</li>
                        <li onClick={() => setContentChanger("create employee")}>Create Employee</li>
                    </ul>

                </div>

                <div className='contentDiv'>

                    {employeeError && <div style={{ padding: "10px", textAlign: "center", color: "red", backgroundColor: "#ffdadb" }}>{employeeError}</div>}

                    {contentChanger === "employee list"
                        ? <EmployeeList employeeData={employeeData} updateEmployeeFunc={updateEmployeeFunc} getEmployeeList={getEmployeeList}></EmployeeList>
                        : contentChanger === "create employee"
                            ? <CreateEmployee getEmployeeList={getEmployeeList}></CreateEmployee>
                            : contentChanger === "update employee"
                                ? <CreateEmployee updateEmployee={updateEmployee} getEmployeeList={getEmployeeList}></CreateEmployee>
                                : <span style={{ fontSize: "2rem", textAlign: "center" }}>Welcome to dashboard</span>
                    }

                </div>
            </div>
        </div>
    )
}

