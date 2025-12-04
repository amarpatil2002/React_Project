import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { decrementCount, incrementByValue, incrementCount } from '../slice/counterSlice'

function Counter() {

    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()

  return (
    <>
        <button onClick={() => dispatch(incrementCount())} >+</button>
        {count}
        <button onClick={() => dispatch(decrementCount())} >-</button>
        <button onClick={() => dispatch(incrementByValue(5))} >IncrementByValue</button>
    </>

  )
}

export default Counter