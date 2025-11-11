import { useState } from "react"

const ToggleBtn = () => {

    const [toggle , setToggle] = useState(false)

    return(<>
    <h3>Add Toggle Functionality</h3>
    <button onClick={() => setToggle(!toggle)} className={` px-2 rounded ${toggle?"bg-green-500":"bg-blue-500"}`} >
        {toggle?"Hide":"Show"}
    </button>

        {
            toggle?<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, omnis. Beatae voluptate rerum quae ullam quia, velit qui ab natus itaque quibusdam quo ipsum reprehenderit eos alias minus aliquam? Delectus, optio qui eius eos numquam saepe tempore voluptate eum, officia neque reiciendis harum eveniet dicta vel nulla similique odio. Eum!</p>
            :null
        }

    </>)
}

export default ToggleBtn