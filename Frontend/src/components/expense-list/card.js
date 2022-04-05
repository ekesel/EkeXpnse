import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux';
import { categories } from '../../constants/add-expense';
import { deleteExpense } from '../../redux/actions/expenses';
import './card.css'
import { BASE_URL } from '../../pages/auth/api'

async function DeleteExpense(item) {
  const url = BASE_URL+'manage'
  const data = {
    "id":item,
  }
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('savedToken')
    },
    body: JSON.stringify(data)
  })
    .then(data => data.json())
 }

const Card = ({item, notifySuccess }) => {
  const time = moment(item.createdAt).fromNow();
  const dispatch = useDispatch();
  const handleDelete=async ()=>{
    const obj = await DeleteExpense(item.id);
    console.log(obj);
    dispatch(deleteExpense(obj));
    notifySuccess();
  }
  const category = categories.filter((bj)=> 
  {
    if(bj.title === item.category) 
      return true;
  })
  return (
    <div className="card" style={{borderRight:`6px solid ${category[0].color}` }}>
      <div className="card-image-container">
        <img src={category[0].icon} alt={category[0].title} className='card-image' />
      </div>
      <div className="card-info">
        <label className='card-title'>{item.title}</label>
        <label className='card-item'>{time}</label>
      </div>
      <div className="card-right">
          <div>
            <label className="card-amount">Rs. {item.price}</label>
          </div>
           <div className="delete-icon" onClick={handleDelete}>
           <i class="fi fi-rr-trash"></i>
           </div>
      </div>
    </div>
  )
}

export default Card