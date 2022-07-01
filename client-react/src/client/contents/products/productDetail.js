
import {useParams} from "react-router-dom";

import {useState,useEffect} from 'react'
import axios from 'axios'


function ProductDetail({product}){
  const [like,setLike]=useState(false)
  const [productLike,setProductLike]=useState([])
  const {id}=useParams();

  const headers={
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }
 
 
  const productId={productId:product[id]._id};
  console.log(productId)
    useEffect(()=>{
      axios.get('/api/reviews/productLike',{
        params:{productId:product[id]._id},
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res=>setProductLike(res.data))
      
    },[]) 
    
   
    

 console.log(id);




 
 if(like===true){
  const productId={productId:product[id]._id};
  axios.post('/api/reviews/like',productId,{headers})
  .then(res=>console.log(res.data))
  
 }else{

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
      <span  onClick={()=>{

        
        
        setLike(!like)}}>좋아요{like===true ?"❤":"🤍"}</span>
      
     
    </div>
  </div>
</div> 
     


        </>
    )
}

export default ProductDetail;