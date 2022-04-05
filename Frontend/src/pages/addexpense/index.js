import React from 'react'
import AddForm from '../../components/add-form'
import Topfold from '../../components/topfold'
import './add-expense.css'
import { useDispatch } from 'react-redux';
import { getToken } from '../../redux/actions/auth';
import { useNavigate } from 'react-router';
import { useEffect } from "react";

const AddExpense = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate();
  useEffect(() => {
    const token = dispatch(getToken())
  if(!token.data) {
    navigate('/login')
  }
  });

  return (
    <div className='add-expense'>
    <Topfold />
    <AddForm />
    </div>
  )
}

export default AddExpense