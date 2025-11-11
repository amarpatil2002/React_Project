import { useRef } from "react"


const UnctrolledForm = () => {

    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            username:usernameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value
        }

        console.log(userData);
    }

    return(<>
        <h2>Uncontrolled Form</h2>
        <form onSubmit={handleSubmit} >
            <input ref={usernameRef} type="text" placeholder="Enter username" className="border-2" /><br />
            <input ref={emailRef} type="email" placeholder="Enter email" className="border-2" /><br />
            <input ref={passwordRef} type="password" placeholder="Enter password" className="border-2" /><br />
            <button className="bg-blue-600 py-1 px-3 m-2 rounded text-white" >Sign Up</button>
        </form>
    </>)
}

export default UnctrolledForm