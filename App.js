import React from 'react';
import './App.css';
import Form1 from './Form_create';

class App extends React.Component {

  state = {name: "Lalande", firstname: "Mathieu", age: 19, email: "mathieu.lalande@estiam.com"};

  render() {
    let infos = this.state;  {/* with the  <App1 {...x}/> */}
    return (
      <div className="App">
        <header className="App-header">

          <p>
            Welcome, my name is {this.state.firstname} {this.state.name}, I am {this.state.age} years old. 
            <br/>
            My Email is : {this.state.email}
            <br/>
            <br/>
            Welcome to my CRUD application for Student on Bangalore Trip.
            <br/>
            Parent Componant : App.js
          </p>

        </header>
        <Form1/>
        
      </div>
    );
  }
}

export default App;
