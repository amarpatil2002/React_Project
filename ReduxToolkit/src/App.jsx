import { Provider } from "react-redux"
import Counter from "./components/Counter"
import { counterStore } from "./app/store/counterStore"


function App() {

  return (
    <Provider store={counterStore}>
      <h2>counter using Redux  </h2>
      <Counter />
    </Provider>
  )
}

export default App
