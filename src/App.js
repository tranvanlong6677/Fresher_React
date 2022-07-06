import './App.scss';
import Header from './components/Header'
import TableUsers from './components/TableUsers'
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalAddNew from './components/ModalAddNew';
import { useState } from 'react'
import Container from 'react-bootstrap/Container'
function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
  }
  return (
    <div className="app-container">
      <Container>
        <Header />
        <div className="my-3 add-new" >
          <span><b>Table Users:</b></span>
          <button className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >Add new user</button>
        </div>
        <TableUsers />
      </Container>

      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
      />
    </div>
  )
}

export default App;
