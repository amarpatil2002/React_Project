import { useState } from "react";

const FormHandle = () => {
  const [formData, setFormData] = useState({
    username: "",
    email:"",
    password:""
  });

  const handleChange = (e) => {
    // console.log(e.target);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:e.target.value
    }))
    //OR
    // setFormData({...formData , [e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
  }

  return (
    <>
      <div className="flex items-center justify-content-center">
        <form onSubmit={handleSubmit} >
          <h2>Registration Form</h2>
          <input
          name="username"
            value={formData.username}
            onChange={handleChange}
            className="border-2"
            placeholder="Enter username"
            autoComplete="username"
            type="text"
          />
          <br />
          <input
          name="email"
          value={formData.email}
            onChange={handleChange}
            className="border-2"
            placeholder="Enter email"
            type="email"
            autoComplete="email"
          />
          <br />
          <input
          name="password"
          value={formData.password}
          onChange={handleChange}
            className="border-2"
            placeholder="Enter password"
            autoComplete="current-password"
            type="password"
          />
          <br />
          <button className="bg-blue-500 text-white px-2 rounded my-2 px-3 py-1">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default FormHandle;
