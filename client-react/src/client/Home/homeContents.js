import {useNavigate,Qutlet,useParams} from 'react-router-dom';
import Tap from '../contents/productDetail/Tap'
import {useState} from 'react'

// 이걸 눌렀을때 
function HomeContents(props){
  //const [tap,setTap]=useState(0);
  const {id}=useParams();
  let navigate=useNavigate();
    console.log(props);
    return (
        <div className="container">
        <div className="row">
        <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + props.id + '.jpg'} width="80%" />
      <h4 onClick={()=>{navigate(`/detail/${props.id}`)}}>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }</p>
      <button>버튼</button>
    
    </div>
   
    </div>
    </div>
     
    )
}

export default HomeContents;