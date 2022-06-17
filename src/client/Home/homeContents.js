import {useNavigate,Qutlet,useParams} from 'react-router-dom';

// 이걸 눌렀을때 
function HomeContents(props){
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
    </div>
    </div>
    </div>
     
    )
}

export default HomeContents;