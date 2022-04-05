import React from 'react'
import './expenselist.css'
import Card from './card.js'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';


const ExpenseList = () => {
  const {expenseList: list, query } = useSelector((state)=> state.expenses);
  const filteredList = list.filter((item) => item.title.includes(query));
  const notifySuccess = () => {
    toast.success("Expense Deleted");
  }
  return (
    <div className='expense-list'>
      <ToastContainer
            position="bottom-left"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            />
      {filteredList.length ? filteredList.map(item=>(<Card item={item} notifySuccess={notifySuccess} />)): <div className='empty-state'>
        <img src={require('../../assets/images/empty.png')} alt="Empty list" className='empty-image' />
        <label>Yay! Your Expense List is empty!</label>
        </div>}
       </div>
  )
}


export default ExpenseList