//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route,Link,useNavigate,Qutlet,useParams} from 'react-router-dom';
import { Navbar,Container,Nav,} from 'react-bootstrap';
import {useState} from 'react';
import  shoesData from './client/contents/data'



import Home from './client/Home/home'
import Detail from './client/contents/detail';
import About from './client/contents/About/about'

function App() {
  const [shoes,setShoes]=useState(shoesData)
  let navigate=useNavigate();
 
  return (
    <div className="App">
        <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand onClick={()=>{navigate('/')}}>댕댕마켓</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/contents')}}>상품</Nav.Link>
            <Nav.Link href="/">상세페이지</Nav.Link>
            </Nav>
        </Container>
        </Navbar> 

     
      <Routes>
        <Route path="/" element={<Home shoes={shoes}/>}/>
       
        <Route path ="*" element ={<div>없는 페이지입니다</div>}/>
        <Route path ="/detail/:id" element={<Detail shoes={shoes} useParams={useParams}/>}/>

        <Route path ="/about" element={<About/>}>
          <Route path ="member" element={<About/>}/>
          <Route path ="location" element={<About/>}/>
          </Route>
          
      </Routes>
   
      
      
      
     
    </div>
  );
}

export default App;
