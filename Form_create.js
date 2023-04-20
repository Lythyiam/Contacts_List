import './Form.css';
import React from 'react';
import axios from 'axios';

//function App() {
//lets change from functional to class components
// class components are the way to build components
class Form1 extends React.Component {


    //state ={name:"",email:"",age:0,contacts:[]}
    state = { firstname: "", name: "", age: 0, email: "", contacts: [], message: "" }
    constructor(props) {
        super(props);
        this.changehandler1 = this.changehandler1.bind(this);
        this.submit = this.submit.bind(this);
        this.getcontacts = this.getcontacts.bind(this);
    }
    
    async getcontacts(e) {
        await axios.get(`http://localhost:3005/getallcontacts`)
            .then(res => {
                this.setState({ contacts: res.data });
            })
    }
  
    changehandler1(e) {
        if (e.target.name === "firstname") {
            this.setState({ firstname: e.target.value });
        }
        else if (e.target.name === "name1") {
            this.setState({ name: e.target.value });
        }
        else if (e.target.name === "age") {
            this.setState({ age: e.target.value });
        }
        else if (e.target.name === "email") {
            this.setState({ email: e.target.value });
        }
    }
    
    async submit(e) {
        e.preventDefault();
        const contactData = {
            firstname: this.state.firstname,
            name: this.state.name,
            age: this.state.age,
            email: this.state.email
        };
        if (!this.state.firstname || !this.state.name || !this.state.age || !this.state.email) {
            this.setState({ message : "Please complete all required fields." });
            return;
          }
          
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email)) {
            this.setState({ message : "Please enter a valid email address." });
            return;
          }
          
        if (isNaN(this.state.age) || parseInt(this.state.age) < 18 || parseInt(this.state.age) > 120) {
            this.setState({ message : "Please enter a valid age between 18 and 120." });
            return;
          }
    
        await axios.post("http://127.0.0.1:3005/addcontacts", contactData).then((response) => {
            console.log(response.status, response.data);
            this.setState({ message : `Contact ${this.state.firstname} ${this.state.name} created successfully.`})
        });
    
        // clear form after submit
        this.setState({
            firstname: "",
            name: "",
            age: null,
            email: ""
        });
    }
    
    componentDidMount() {
        // get all contacts when the component mounts
        this.getcontacts();
    }
    
    render() {
        return (
            <div class="App">
                <header className="App-header">
                    <h3>Create a contact</h3>
                    <form onSubmit={this.submit}>
                        <input type="text" name="firstname" class="input" placeholder='Firstname' value={this.state.firstname} onChange={this.changehandler1} />
                        <br /><br />
                        <input type="text" name="name1" class="input" placeholder='Name' value={this.state.name} onChange={this.changehandler1} />
                        <br /><br />
                        <input type="number" name="age" class="input" placeholder='Age' value={this.state.age} onChange={this.changehandler1} />
                        <br /><br />
                        <input type="text" name="email" class="input" placeholder='Email' value={this.state.email} onChange={this.changehandler1} />
                        <br /><br />
    
                        <center>
                            <input type="submit" value="Submit" className='btn-submit' />
                            <p>{this.state.message}</p>
                        </center>
                    </form>
                </header>
            </div>
        );
    }    
}

export default Form1;