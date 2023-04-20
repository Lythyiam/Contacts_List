import './Form.css';
import React from 'react';
import axios from 'axios';

class Form3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = { id: "", contacts: [], message: "" };
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

    async deletecontacts(id) {
        try {
          const res = await axios.delete(`http://localhost:3005/deletecontacts/${id}`);
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
    }

    
    async submit(e) {
        e.preventDefault();
        console.log(this.state);
        const contact = this.state.contacts.find(contact => contact.id === this.state.id);
        if (contact) {
            this.setState({ message: `Contact with id "${this.state.id}" deleted successfully.` });
            await this.deletecontacts(this.state.id);
            await this.getcontacts();
        }
        else {
            this.setState({ message: 'Contact not found. Try again.' });
        }
    }

    render() {
        return (
            <div class="login-app">
                <header className="App-header">
                    <h3>Delete a contact</h3>
                    <form onSubmit={this.submit}>
                        <input type="text" name="ID" class="input" placeholder='Enter ID' value={this.state.id} onChange={this.changehandler1}/>
                        <br/><br/>
                        <center>
                            <input type="submit" value="Submit" className='btn-submit'/>
                            <p>{this.state.message}</p>
                        </center>
                    </form>
                </header>
            </div>
        );
    }
}

export default Form3;
