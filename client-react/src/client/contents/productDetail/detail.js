import {useParams,useNavigate} from "react-router-dom";
import Tap from "./Tap";
import {useState} from 'react'


function Details({shoes}){
 let {id}=useParams();
 let navigate=useNavigate();


  
    return (
        <>
       <div className="container">
  <div className="row">
    <div className="col-md-6">
      <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
    </div>
    <div className="col-md-6">
      <h4 className="pt-5">상품명</h4>
      <p >{shoes[id].title}</p>
      <p>{shoes[id].price}</p>
      <button className="btn btn-danger">채팅하기</button> 
      <Tap />
     
    </div>
  </div>
</div> 
      


        </>
    )
}

export default Details;