import './Listuser.css';
import React from 'react';
import axios from 'axios';

class SeeContacts extends React.Component {
    state = { Contacts: [], copiedId: null, deleted: null }

    async componentDidMount() {
        await axios.get(`http://localhost:3005/getallcontacts`)
        .then(res => {
            const Contacts = res.data.map(Contact => ({...Contact, id: Contact._id}));
            this.setState({ Contacts: Contacts });
        });
    }

    copyToClipboard = (id) => {
        navigator.clipboard.writeText(id);
        this.setState({ copiedId: id });
    }
    async deletecontacts(id) {
        try {
            this.setState({ deleted: id });
          const res = await axios.delete(`http://localhost:3005/deletecontacts/${id}`);
          console.log(res.data);
          await this.getcontacts();
        } catch (error) {
          console.error(error);
        }
    }

    render() {
        return (
            <div className='App'>
                <br/>
                <br/>
                <h3>All contacts</h3>
                {this.state.Contacts.length === 0 && <h4>Any contact found. Add some contacts to start.</h4>}
                <div className="boxes">
                    {this.state.Contacts.map((Contact, index) => (
                        <div key={Contact.id} class="card">
                            Firstname : {Contact.firstname}<br/>
                            Name : {Contact.name}<br/>
                            Age : {Contact.age}<br/>
                            Email : {Contact.email}<br/><br/>
                            <button onClick={() => this.copyToClipboard(Contact.id)} class="buttonCopy">Copy ID</button>
                            {this.state.copiedId === Contact.id && <span>  Copied.</span>}<br/>
                            <button onClick={() => this.deletecontacts(Contact.id)} class="buttonCopy">Delete</button>
                            {this.state.deleted === Contact.id && <span>  Deleted.</span>}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default SeeContacts;
