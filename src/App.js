import './App.scss';
import Header from './components/Header'
import TableUsers from './components/TableUsers'
import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  
  return (
    <>
        
        <div className="app-container">
        <Container>
          <Header />
          <TableUsers />
        </Container>


        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  )
}

export default App;
