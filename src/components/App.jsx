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
    const contacts = [...this.state.contacts];
    const personToFind = id;
    const newContacts = contacts.filter(({ id }) => id !== personToFind);
    this.setState({
      contacts: newContacts,
    });
  };

  submitCathcer = ({ name, number }) => {
    const contacts = [...this.state.contacts];
    const nameToAdd = name;
    const person = {
      name: `${name}`,
      id: `${nanoid()}`,
      number: `${number}`,
    };

    const addCheck = contacts.find(({ name }) => name.includes(nameToAdd));
    if (!addCheck) {
      contacts.push(person);
      this.setState({
        contacts: contacts,
      });
    } else {
      alert(`${nameToAdd} is already in contacts`);
    }
  };

  filteredNames() {
    const contacts = [...this.state.contacts];
    const filter = this.state.filter;
    const filtered = contacts.filter(({ name }) =>
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