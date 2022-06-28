import {Nav} from "react-bootstrap"


function Tap(){
    return(
        <>
         <Nav variant="tabs"  defaultActiveKey="link0">
    <Nav.Item>
      <Nav.Link eventKey="link0">사용자가 올린 상품 </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link1">제품과 관련된 상품 </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link2">후기</Nav.Link>
    </Nav.Item>
        </Nav> 
</>

    )

}

    



export default Tap