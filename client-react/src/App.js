//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route,Link,useNavigate,Qutlet,useParams} from 'react-router-dom';
import { Navbar,Container,Nav,} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import  shoesData from './client/contents/data'
import axios from 'axios';
import * as Api from './api';



import Home from './client/Home/home'
import Detail from './client/contents/productDetail/detail';
import About from './client/contents/About/about'
import InputProduct from './client/contents/products/input-product'
import Products from './client/contents/products/products'
import Register from './client/user/register';
import Login from './client/user/login'
import Cart from './client/cart/cart'
import ProductDetail from "./client/contents/products/productDetail"


function App() {
  const [shoes,setShoes]=useState(shoesData)
  let navigate=useNavigate();

  const[login,setLogin]=useState(false)

   let [product,setProduct]= useState();
   useEffect(()=>{
     axios.get('/api/products')
     .then(res=>setProduct(res.data))
     if(token==null) {
      return setLogin(false)
   
     }else{
       return setLogin(true)
     }
},[])

console.log(product)


const token=(localStorage.getItem("token"))
console.log(token)

  


  useEffect(()=>{
    axios.get('/api/hello')
    .then(res =>console.log(res.data))
  },[])
 
 // <Nav.Link href="/">상세페이지</Nav.Link>
 function onClick(){
   try{
    localStorage.removeItem("token")
    window.location.href = '/';
   }catch(err){
      console.log(err)
   }
 }
 
 
  
 
  return (
    <div className="App">
        <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand onClick={()=>{navigate('/')}}>댕댕마켓</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/products')}}>{login ==false ? null :"상품" }</Nav.Link>
            
            <Nav.Link href="/cart">장바구니</Nav.Link> 
            <Nav.Link href="/login">{login ==true ? null : "로그인" }</Nav.Link>
            <Nav.Link  onClick={onClick }>{login ==true ? "로그아웃" : null  }</Nav.Link>  
            <Nav.Link href="/register" >{login ==true ? null :"회원가입" }</Nav.Link>
            <Nav.Link href="/inputProduct" >{login ==false ? null :"상품등록" }</Nav.Link>  
            <Nav.Link href="/myPage">{login ==false ? null :"마이페이지" }</Nav.Link> 

            
            </Nav>
        </Container>
        </Navbar> 
        

     
      <Routes>
        <Route path="/" element={<Home shoes={shoes}/>}/>

        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path ="/products" element={<Products/>}/>
        <Route path ="/inputProduct" element={<InputProduct/>}/>
        
       
        
        <Route path ="/detail/:id" element={<Detail shoes={shoes} useParams={useParams}/>}/>
        <Route path ="/product/:id" element={<ProductDetail product={product} useParams={useParams} />}/>
        <Route path ="/cart" element ={<Cart/>}/>

        <Route path ="/about" element={<About/>}>
          <Route path ="member" element={<About/>}/>
          <Route path ="location" element={<About/>}/>
          </Route>
         
          
      </Routes>
   
      
      
      
     
    </div>
  );
}

export default App;
