import {NavLink ,Route,Routes} from 'react-router-dom';


import React from 'react';
import Form1 from './Form_create';
import Form2 from './Form_update';
import Form3 from './Form_delete';
import SeeContacts from './SeeContacts';
import './Menu.css';


class Menu extends React.Component{

  contructor(props){

  }
  render(){

    return(
        <div className="App">
            <header className="App-header">
                <nav>
                    <ul>
                        <li><NavLink to='/'>Show Contacts</NavLink></li>
                        <li><NavLink to='/form1'>Create Contact</NavLink></li>
                        <li><NavLink to='/form2'>Update Contact</NavLink></li>
                        <li><NavLink to='/form3'>Delete Contact</NavLink></li>
                    </ul>
                </nav>
  
                <Routes>
                    <Route  exact path='/' element={<SeeContacts/>}></Route>
                    <Route  exact path='/form1' element={<Form1/>}></Route>
                    <Route  exact path='/form2' element={<Form2/>}></Route>
                    <Route  exact path='/form3' element={<Form3/>}></Route>
                </Routes>     
                
            </header>
       </div>
    )
  }
}
export default Menu;