import { Navbar,Container,Nav,} from 'react-bootstrap';
import {useState} from 'react';
import './Home.css';
import { BrowserRouter,Routes,Route,Link} from 'react-router-dom';

import ShopNavbar from '../component/navbar'
import  HomeContents from './homeContents'
import  shoesData from '../contents/data'
import Details from '../contents/detail';





function Home(){
    const [shoes,setShoes]=useState(shoesData)
    return(
        <>
        {
            shoes.map((a,i)=>{
                return(
                    <HomeContents shoes={shoes[i]} id={i+1}/>
                )
            })
        }
            </>
    )


}
export default Home;