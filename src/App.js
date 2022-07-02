import './App.scss';
import Header from './components/Header'
import TableUsers from './components/TableUsers'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
function App() {
  return (
    <>
      {/* <Container>
        <Row> */}
      <Header />

      <TableUsers />
      {/* </Row>


      </Container> */}
    </>
  )
}

export default App;
