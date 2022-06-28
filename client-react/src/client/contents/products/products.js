import {useEffect, useState} from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

function Products(){

    
    let navigate=useNavigate();
    const [login,setLogin]=useState(false);
     const token =localStorage.getItem("token")
    
    
    const [product,setProduct]= useState([]);
         useEffect(()=>{
             axios.get('/api/products')
             .then(res=>setProduct(res.data))
         },[])

         console.log(product)
         
    
      


   return(

        <>
        {product.map((a,i)=>{
            return (
                
                <Card style={{ width: '80rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
        <Card.Title>제품 :{product[i].title} </Card.Title>
        <Card.Text>
           {product[i].content}
        </Card.Text>
        <div> 올린사람 :{product[i].email}</div>
        <Card.Text>
           {product[i].category}
        </Card.Text>
        <Button variant="primary" onClick={()=>{navigate(`/product/${i}`)}}
         >제품보러가기 
        </Button><span>❤{product[i].like}</span>
        <div key={product.id}></div>
            
            </Card.Body>
            </Card>

            )
        })}
         
         
           
            

        </>
    )

}

export default Products;