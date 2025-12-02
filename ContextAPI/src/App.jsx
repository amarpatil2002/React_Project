import Login from "./Login"
import Profile from "./Profile"
import UserProvider from "./context/UserContext"

function App() {

  return (
    <UserProvider>
      <h2>Context API in React</h2>
      <Login />
      <Profile />
    </UserProvider>
  )
}

export default App
