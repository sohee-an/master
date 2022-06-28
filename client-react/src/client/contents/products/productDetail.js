
import {useParams,useNavigate} from "react-router-dom";

import {useState} from 'react'
import axios from 'axios'


function ProductDetail({product}){
    console.log(product)
    let navigate=useNavigate();
    
    const [like,setLike]=useState(false)
   
   
 const {id}=useParams();
 console.log(id);
 console.log(product[0]._id)
 const productId =[]
 

 
 if(like==true){
   axios.post('/api/user/like',)
  
 }


  
    return (
        <>
        <div className="container">
  <div className="row">
    <div className="col-md-6">
      <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
    </div>
    <div className="col-md-6">
      <h4 className="pt-5">상품명</h4>
      <p >{product[id].title}</p>
      <p>{product[id].price}</p>
      <button className="btn btn-danger">채팅하기</button> 
      <span onClick={()=>{setLike(!like)}}>좋아요{like===true ?"❤":"🤍"}</span>
      
     
    </div>
  </div>
</div> 
     


        </>
    )
}

export default ProductDetail;