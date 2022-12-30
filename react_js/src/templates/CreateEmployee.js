import React, { useState } from 'react'
import axios from "axios"

export default function CreateEmployee(props) {


    //state variale for data
    const [employeeData, setEmployeeData] = useState(props.updateEmployee ? props.updateEmployee : {
        name: "",
        email: "",
        phone: "",
        designation: "",
        gender: "",
        course: [],
        photo: {}
    })

    async function submitHandler(e) {
        e.preventDefault()
        setEmployeeData({ ...employeeData, message: "", error: "" })

        try {

            const formData = new FormData(e.target)

            let url = ""
            if (props.updateEmployee) {
                url = "/api/admin/update"
                formData.append("_id", employeeData._id)
            } else
                url = "/api/admin/save"

            console.log(formData.get("phone"))
            const { data } = await axios.post(url, formData)
            console.log(data)
            if (data) {
                props.getEmployeeList()
                setEmployeeData({ ...employeeData, message: data.message, error: "" })
            }


        } catch (err) {
            console.log(err)
            setEmployeeData({ ...employeeData, message: "", error: err.response.data.error ? err.response.data.error : err.message })
        }
    }

    function handleChange(e) {
        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value })
    }

    function handleCheckbox(e) {

        let course = employeeData.course

        if (employeeData.course.includes(e.target.value))
            course = employeeData.course.filter(x => x != e.target.value)
        else
            course.push(e.target.value)

        setEmployeeData({ ...employeeData, course })
    }

    function imageHandler(e) {
        setEmployeeData({ ...employeeData, photo: e.target.files[0] })
    }


    return (
        <div className='row center'>

            <div className='Model'>

                {employeeData.error && <div style={{ padding: "10px", textAlign: "center", color: "red", backgroundColor: "#ffdadb" }}>{employeeData.error}</div>}
                {employeeData.message && <div style={{ padding: "10px", textAlign: "center", color: "green", backgroundColor: "rgb(204, 253, 204)" }}>{employeeData.message}</div>}
                <form className='form2' onSubmit={submitHandler} encType='multipart/form-data'>

                    <label>Name</label>
                    <input type="text" className="input" name="name" placeholder="Kindly enter name" value={employeeData.name} onChange={handleChange} required ></input>

                    <label>Email</label>
                    <input type="email" className="input" name="email" placeholder="Kindly enter email" value={employeeData.email} onChange={handleChange} required ></input>


                    <label>Phone</label>
                    <input type="number" className="input" name="phone" placeholder="Kindly enter phone" value={employeeData.phone} onChange={handleChange} required
                        pattern="[7-9]{1}[0-9]{9}" title="Phone number with 7-9 and remaing 9 digit with 0-9" ></input>


                    <label>Designation</label>
                    <select className='input' value={employeeData.designation} name="designation" onChange={handleChange}>
                        {["Select Designation", "HR", "Manager", "Sales"].map((x) => (
                            <option key={x}>{x}</option>
                        ))}
                    </select>

                    <label>Gender</label>
                    <div className='row' onChange={handleChange}>
                        <div>
                            <input type="radio" name="gender" value="Male" id="male" checked={employeeData.gender === "Male"} required ></input>
                            <label htmlFor='male'>Male</label>
                        </div>

                        <div>
                            <input type="radio" name="gender" value="Female" id="female" checked={employeeData.gender === "Female"} required ></input>
                            <label htmlFor='female'>Female</label>
                        </div>
                    </div>

                    <label>Course</label>
                    <div className='row' >
                        <div onChange={handleCheckbox}>
                            <input type="checkbox" name="course" value="MCA" id="course1" checked={employeeData.course.includes("MCA")} ></input>
                            <label htmlFor='course1'>MCA</label>
                        </div>

                        <div onChange={handleCheckbox}>
                            <input type="checkbox" name="course" value="BCA" id="course2" checked={employeeData.course.includes("BCA")} ></input>
                            <label htmlFor='course2'>BCA</label>
                        </div>

                        <div onChange={handleCheckbox}>
                            <input type="checkbox" name="course" value="BSC" id="course3" checked={employeeData.course.includes("BSC")} ></input>
                            <label htmlFor='course3'>BSC</label>
                        </div>
                    </div>


                    <label>Photo</label>
                    <input type="file" name="photo" onChange={imageHandler} accept=".png, .jpg, .jpeg" ></input>


                    <button className='button'>{employeeData.isDescriptionCategorised ? "SAVE" : "PROCEED"}</button>

                </form>
            </div>



        </div>
    )
}
