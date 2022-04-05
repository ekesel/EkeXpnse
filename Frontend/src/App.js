import Home from './pages/home/index.js'
import Header from './components/header/index.js'
import AddExpense from './pages/addexpense/index.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/index.js';
import Login from './pages/auth/login.js';
import Register from './pages/auth/register.js';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/add-expense' element={<AddExpense />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
      </BrowserRouter>
  );
}

export default App;
