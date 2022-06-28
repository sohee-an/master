//import { Navbar,Container,Nav,} from 'react-bootstrap';
import {useState} from 'react';
import './Home.css';
//import { BrowserRouter,Routes,Route,Link} from 'react-router-dom';


import  HomeContents from './homeContents'
import  shoesData from '../contents/data'
import axios from 'axios';






function Home({shoes}){
     
   // const [shoes,setShoes]=useState(shoesData)
    return(
        <>
        

        {
            shoes.map((a,i)=>{
                return(
                    <HomeContents shoes={shoes[i]} id={i+1}/>
                )
            })
        }
        <div>
            
        </div>
        
            </>
    )


}
export default Home;