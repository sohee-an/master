//import {useNavigate,Qutlet,useParams} from 'react-router-dom';
import {useRef,useState} from "react";
import Form from 'react-bootstrap/Form';
import axios from 'axios'
//import Dropzone from 'react-dropzone';


// 이걸 눌렀을때 
function InputProduct(){
  const[file,setFile]=useState();
  
  
  function onSubmitHandling(e){
    e.preventDefault() 
    
    console.log(titleRef.current.value)
    console.log(contentRef.current.value)
    console.log(categoryRef.current.value)

    const title={title:titleRef.current.value};
    const content={content:contentRef.current.value};
    const category={category:categoryRef.current.value}
    const price ={price:priceRef.current.value};
    const priceConsulation={priceConsulation:priceConsulationRef.current.value}
    
   const formData=new FormData();
  
    
 
   
  formData.append('image',file);
  console.log(file);

    const data ={title,content,category,price,priceConsulation}
    console.log(data)

    const headers={
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
    

      axios
      .post("/api/products", formData,{headers})
      .then((res) => {
        if(res.data.success){
          console.log(res.data.success)
          alert('상품등록이 잘 되었습니다. ')
          //window.location.href= "/products"
        }else {
          alert("상품등록이 실패되었습니다.")
          
       }
      });
     }
    
  

    const titleRef= useRef("글제목");// 돔의 위치를 알려준다.
    const contentRef= useRef("내용");
    const categoryRef= useRef("음식 및 기타");
    const priceRef=useRef(0)
    const priceConsulationRef=useRef("");
    //onSubmit={onSubmitHandling} 
     


    return (
      <div style={{maxWidth:'700px', margin:'2rem auto'}}>
          
       
        <Form onSubmit={onSubmitHandling}  >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>글제목</Form.Label>
        
        <Form.Control type="text" placeholder={titleRef.current} ref={titleRef}/>
        <div style={{maxWidth:'700px', margin:'2rem auto'}}></div>
        <Form.Label>사진</Form.Label>
        <Form.Control type="file"  name="image" accept="image/jpg"
        onChange={e=>
          
          { const currFile =e.target.files[0];
          setFile(currFile)}}/>
       
        <div style={{maxWidth:'700px', margin:'2rem auto'}}></div>
        <Form.Label>가격</Form.Label>
        <Form.Control type="number" placeholder={priceRef.current} ref={priceRef}/>

        <div style={{maxWidth:'700px', margin:'2rem auto'}}></div>
        <Form.Label>가격제안 설정</Form.Label>
      <Form.Select aria-label="Default select example" ref={priceConsulationRef}>
      <option value="가격제안 가능">가격제안 가능</option>
      <option value="가격제안 불가능">가격제안 불가능</option>
    </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>내용</Form.Label>
        <Form.Control as="textarea" rows={3}  ref={contentRef}/>
      </Form.Group>

      <Form.Label>카테고리</Form.Label>
      <Form.Select aria-label="Default select example" ref={categoryRef}>
      <option value="전자기기">전자기기</option>
      <option value="의류">의류</option>
      <option value="음식 및 기타">음식 및 기타</option>
    </Form.Select>
      <button type='submit'>작성완료</button>
    </Form>


        </div>
      
    )
    }

export default InputProduct;