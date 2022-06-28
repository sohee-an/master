import { Navbar,Container,Nav,} from 'react-bootstrap';

function  ShopNavbar(){
    return (
        <>
        <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="./">댕댕마켓</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/contents">상품</Nav.Link>
            <Nav.Link href="/detail">상세페이지</Nav.Link>
            
            </Nav>
        </Container>
        </Navbar> 
      </>
    )
}

export default ShopNavbar;