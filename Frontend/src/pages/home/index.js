import React from 'react';
import './home.css';
import Topfold from '../../components/topfold';
import ExpenseList from '../../components/expense-list';
import { useDispatch } from 'react-redux';
import { getToken } from '../../redux/actions/auth';
import { useNavigate } from 'react-router';
import { useEffect } from "react";
import { BASE_URL } from '../auth/api'
async function GetExpenses() {
  const url = BASE_URL+'manage'
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('savedToken')
    },
  })
    .then(data => data.json())
 }

function Home() {
  const dispatch = useDispatch()
  let navigate = useNavigate();
  useEffect(() => {
  const token = dispatch(getToken())
  if(!token.data) {
    navigate('/login')
  }
  });
  useEffect(async () => {
    const expenses = await GetExpenses();
    localStorage.setItem("expense-list",JSON.stringify(expenses))
  })
  

  return (
    <div className='home'>
      <Topfold />
      <ExpenseList />
      </div>
  )
}  

export default Home;
