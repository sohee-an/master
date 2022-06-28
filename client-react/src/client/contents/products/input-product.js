//import {useNavigate,Qutlet,useParams} from 'react-router-dom';
import {useRef,useEffect} from "react";
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import Dropzone from 'react-dropzone';


// 이걸 눌렀을때 
function InputProduct(){
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
    const img={imgRef:imgRef.current.value};
    console.log(img)

    const data ={title,content,category,price,priceConsulation ,img}
  
    

    // axios
    // .post("/api/products", data)
    // .then((res) => {
    //   if((res.data)=null){
    //     alert('상품등록이 잘 되지않았습니다 ')
    //   }else {
    //     console.log(res.data);
    //     window.location.href= "/products"
    //   }
    // });
    }
    
  

    const titleRef= useRef("글제목");// 돔의 위치를 알려준다.
    const contentRef= useRef("내용");
    const categoryRef= useRef("음식 및 기타");
    const priceRef=useRef(0)
    const priceConsulationRef=useRef("");
    const imgRef=useRef("파일 업로드")

    return (
      <div style={{maxWidth:'700px', margin:'2rem auto'}}>
          
       
        <Form onSubmit={onSubmitHandling} >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>글제목</Form.Label>
        
        <Form.Control type="text" placeholder={titleRef.current} ref={titleRef}/>
        <div style={{maxWidth:'700px', margin:'2rem auto'}}></div>
        <Form.Label>사진</Form.Label>
        <Form.Control type="file" ref={imgRef} id="chooseFile" name="chooseFile" accept="image/*" onchange="loadFile(this)"/>

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
      <button>작성완료</button>
    </Form>


    
       
        
        </div>
      
    )
    }

export default InputProduct;