
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link , Navigate , Routes} from 'react-router-dom';
 
import Leftside from './leftside';  
import Header from './header'  
import Footer from './footer'  
import Home from './home' 
import Calcul from './calculator' 
import Social from './social' 
import Contest from './context' 
import { Dashbord } from './dashbord';
import Dash from './dash' 
import Migration from './migration' ;
import Old from './old_slr' ;
import {Presale}  from './presale'; 
import {Marketing}  from './marketing'; 


// import {   Route, Switch, Redirect  } from 'react-router-dom';  
//import { Routes ,Route,Router } from 'react-router-dom';

// import {
//     BrowserRouter as Router, 
//     Routes, 
//     Route
//   } from 'react-router-dom';



  
export class Layout extends Component {  








  
       render() {  
        return (  
            <div>  
                <div id="wrapper">  


                 <Header  />  



                   <Router> 
    
                  <Leftside></Leftside>  


                        <Routes>
                        <Route exact path="/old" render={(props) => (
    <Old id={props.match.params.id}/>
)} />
                        <Route exact path="/" element={<Dashbord  />} />
                        <Route  path="/calculator" element={<Calcul  />} />
                        {/* <Route  path="/old" element={<Old  />} /> */}
                        <Route  path="/dash" element={<Dashbord  />} />
                        <Route  path="/presale" element={<Presale  />} />
                        <Route  path="/SocialMedia" element={<Social  />} />
                        <Route path="/contest" element={<Contest />} />
                        <Route path="/MarketingProposal" element={<Marketing />} />
                        
                        {/* <Route path="/Migration" element={<Migration />} /> */}
                        
                        {/* <Navigate from="*" to="/" /> */}
                        </Routes>
                      
                    </Router>


                        <Footer />  
                  
                </div>  
            </div>  
        )  
    }  
}  
  
export default Layout









