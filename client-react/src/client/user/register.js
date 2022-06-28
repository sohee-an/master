import { Form,Button} from 'react-bootstrap';
import {useEffect,useState}from 'react';
import axios from 'axios';
import * as Api from '../../api';

function Register(){
  const [user,setUser]=useState();
    const [inputEmail,seInputEmail]=useState('');
    const [inputPwd,setInputPwd]= useState('');

    const inputEmailHandler=(e)=>{
        seInputEmail(e.currentTarget.value);

    }
    const inputPwdHandler=(e)=>{
        setInputPwd(e.currentTarget.value);

    }
    
   
   
    const onSubmitHandler=(e)=>{
        e.preventDefault()
        const body={
          email:inputEmail,
          password:inputPwd
        }
        axios.post("/api/user/register", body)
        .then((res) => { setUser(res.data)})
        console.log(user)
        
           if(user===undefined){
              alert('이미 등록된 이메일입니다.')
           }else {
             alert('정상적으로 회원가입이 되었습니다!')
             window.location.href = '/';
           }
          // console.log(user)
        }
        
       

       
          
        
   
        
        
       

    return (
        <Form onSubmit={onSubmitHandler}>
  <Form.Group className="mb-3" controlId="formBasicEmail" >
    <Form.Label>이메일</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={inputEmail} onChange={inputEmailHandler}  />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>비밀번호</Form.Label>
    <Form.Control type="password" placeholder="Password" value={inputPwd} onChange={inputPwdHandler}/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
    )
    
    
    
}


export default Register;