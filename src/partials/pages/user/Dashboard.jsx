import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount } from '../../../features/counterSlice';
import { Link } from 'react-router-dom';
import "../css/Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.counter.value);

  const decreaseCurrenValue = (val) => {
    if (val > 0) {
      dispatch(decrement());
      return val
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">User Dashboard</h1>
      <Link to="/admin/dashboard">Dashboard</Link>
      <h3>Value: {value}</h3>
      <button onClick={() => dispatch(increment())}>Increase</button>
      <button onClick={() => decreaseCurrenValue(value)}>Decrease</button>
      <button onClick={() => dispatch(incrementByAmount(value))}>Increase with current value</button>
    </div>
  )
}

export default Dashboard