import React from 'react';
import Form from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  onDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  };

  submitCathcer = ({ name, number }) => {
    const person = {
      name: `${name}`,
      id: `${nanoid()}`,
      number: `${number}`,
    };
    this.setState(prevState => ({
      contacts: prevState.contacts.find(contact => contact.name === name)
      ? alert(`${name} is already in contacts`) : [person, ...prevState.contacts]
    })
    )
  };

  filteredNames() {
    // const contacts = [...this.state.contacts];
    const filter = this.state.filter;
    const filtered = this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return filtered;
  }

  onFilter = e => {
    const nameIs = e.target.value;
    this.setState({ filter: nameIs });
  };

  render() {
    return (
      <>
        <p>Phonebook</p>
        <Form onSubmit={this.submitCathcer} />
        <p>Contacts</p>
        <Filter onFilter={this.onFilter} />
        <ContactList contacts={this.filteredNames()} onDelete={this.onDelete}/>
      </>
    );
  }
}
export default App;