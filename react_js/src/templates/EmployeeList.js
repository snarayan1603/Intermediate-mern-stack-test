import axios from 'axios'
import React from 'react'

export default function EmployeeList(props) {

    const [employeeData, setEmployeeData] = React.useState(props.employeeData)
    const [searchValue, setSearchValue] = React.useState("")
    const [employeeError, setEmployeeError] = React.useState("")

    async function deleteEmployee(_id) {
        try {

            const { data } = await axios.post("/api/admin/delete", { _id })
            if (data)
                props.getEmployeeList()

        } catch (err) {
            console.log(err)
            setEmployeeError(err.response.data.error ? err.response.data.error : err.message)
        }
    }

    function submitHandler(e) {

        e.preventDefault()

        let newEmployeeData = props.employeeData.filter((x) => x.name.includes(searchValue))
        setEmployeeData(newEmployeeData)

    }


    return (
        <div>
            <div className='row center' style={{ justifyContent: "center", alignItems: "center", cursor: "pointer", flexDirection: "column" }}>
                <span style={{ fontSize: "2rem", padding: "1rem" }}>Dmployee Data</span>

                <form className='row center' style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
                    <input type="text" className='input' placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)}></input>
                    <button className='button' style={{ width: "5rem", margin: "0" }}>Search</button>
                </form>

                {employeeError && <div style={{ padding: "10px", textAlign: "center", color: "red", backgroundColor: "#ffdadb" }}>{employeeError}</div>}
                <div style={{ overflow: "auto", width: "100%" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile No.</th>
                                <th>Designation</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Create Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeData && employeeData.map((x, i) => (
                                <tr key={i}>
                                    <td>{x._id}</td>
                                    <td><img src={"http://localhost:3000/" + x.photo} alt="photo" style={{ width: "2rem" }}></img></td>
                                    <td>{x.name}</td>
                                    <td>{x.email}</td>
                                    <td>{x.phone}</td>
                                    <td>{x.designation}</td>
                                    <td>{x.gender}</td>
                                    <td>{x.course}</td>
                                    <td>{x.createDate}</td>
                                    <td><button onClick={() => props.updateEmployeeFunc(x)}>Edit</button><button onClick={() => deleteEmployee(x._id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    )
}
