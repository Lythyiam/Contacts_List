import './Form.css';
import React from 'react';
import axios from 'axios';

class Form2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = { id: "", firstname: "", name: "", age: 0, email: "", contacts: [], message: "" };
    this.changehandler1 = this.changehandler1.bind(this);
    this.submit = this.submit.bind(this);
    this.getcontacts = this.getcontacts.bind(this);
  }

  async componentDidMount() {
    await this.getcontacts();
}

  async getcontacts() {
    try {
      const res = await axios.get(`http://localhost:3005/getallcontacts`);
      console.log(res.data);
      const contacts = res.data.map(contact => {
        return { id: contact.id, firstname: contact.firstname, name: contact.name, age: contact.age, email: contact.email };
      });
      this.setState({ contacts: contacts });
      console.log('state', this.state.contacts);
    } catch (error) {
      console.error(error);
    }
}

  async updatecontact(contactData) {
    try {
      const res = await axios.put(`http://localhost:3005/updatecontacts`, contactData);
      console.log(res.data);
      await this.getcontacts();
    } catch (error) {
      console.error(error);
    }
  }

  changehandler1(e) {
    if (e.target.name === "ID") {
      console.log(e.target.value);
      this.setState({ id: e.target.value });
    }
    if (e.target.name === "firstname") {
      console.log(e.target.value);
      this.setState({ firstname: e.target.value });
    }
    if (e.target.name === "name1") {
      console.log(e.target.value);
      this.setState({ name: e.target.value });
    }
    if (e.target.name === "age") {
      this.setState({ age: e.target.value });
      console.log(this.state);
    }
    if (e.target.name === "email") {
      console.log(e.target.value);
      this.setState({ email: e.target.value });
    }
  }

  async submit(e) {
    e.preventDefault();
    console.log(this.state);
    const contactData = {
      id: this.state.id,
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
    const contact = this.state.contacts.find(contact => String(contact.id) === this.state.id);
    if (contact) {
      this.setState({ id: null, firstname: "", name: "", age: 0, email: "", message: 'Contact updated successfully.' });
      await this.updatecontact(contactData);
      await this.getcontacts();
    }
    else {
      this.setState({ message: 'Contact not found. Maybe it is not a correct ID ?' });
    }
  }
    render() {

        return ( 
            <div class="login-app">
                <header className="App-header">
                    <h3>Update a contact</h3>
                    <h4>PLEASE BE CAREFUL AND ENTER THE ID <strong><u>CORRECTLY</u></strong></h4>
                    <form onSubmit = { this.submit } >
                        <input type="text" name="ID" class="input" placeholder='ID' value={this.state.id} onChange={this.changehandler1}/><p>{this.state.message}</p>
                        
                        < input type = "text" name = "firstname" class="input" placeholder='Firstname' value = { this.state.firstname } onChange = { this.changehandler1 }/>
                        <br/> <br/>
                        < input type = "text" name = "name1" class="input" placeholder='Name' value = { this.state.name } onChange = { this.changehandler1 }/>
                        <br/> <br/>
                        < input type = "number" name = "age" class="input" placeholder='Age' value = { this.state.age } onChange = { this.changehandler1 }/>
                        <br/><br/>
                        < input type = "text" name = "email" class="input" placeholder='Email' value = { this.state.email } onChange = { this.changehandler1 }/>
                        <br/> <br/>
                        
                        <center>
                            <input type = "submit" value = "Submit" className='btn-submit'/>
                        </center>
                    </form>
                </header>
            </div>
        );
    }
}

export default Form2;