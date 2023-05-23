import React, { Component } from "react";
import { nanoid } from 'nanoid';

import Section from "components/Section";
import PhonebookForm from "components/PhonebookForm";
import ContactList from "components/ContactList";
import Filter from "components/Filter";

const defaultContacts = [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
];

class App extends Component {
    state = {
        contacts: defaultContacts,
        filter: '',
    };

    componentDidMount() {
        const savedContacts = JSON.parse(localStorage.getItem('contacts'))

        if (!savedContacts) {
            return;
        };

        this.setState({
            contacts: savedContacts,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const nextContacts = this.state.contacts;
        const prevContacts = prevState.contacts;

        if (prevContacts !== nextContacts) {
            return localStorage.setItem('contacts', JSON.stringify(nextContacts))
        }
    };

    handleSubmit = ({ name, number }) => {
        const { contacts } = this.state;
        const isContact = contacts.find(contact => {
            return contact.name === name;
        })

        this.setState((prevState) => {
            if (isContact) {
                alert(`${name} is already exists`)
                return;
            } else {
                return {
                    contacts: [{
                        name,
                        number,
                        id: nanoid(),
                    }, ...prevState.contacts],
                };
            };
        });
    };

    onChangeFilter = (e) => {
        const filter = e.currentTarget.value
        this.setState({
            filter: filter,
        });

    };

    visibleContacts = () => {
        const { filter, contacts } = this.state
        const normalizedFilter = filter.toLowerCase()

        const filteredContacts = contacts.filter(({ name }) => {
            return name.toLowerCase().includes(normalizedFilter)
        });
        return filteredContacts;
    };

    deleteContact = (id) => {
        this.setState((prevState) => {
            const { contacts } = this.state
            const contactsAfterDelete = contacts.filter((contact) => {
                return contact.id !== id;
            });
            return {contacts: [...contactsAfterDelete]}
        })
    }

    render() {
      return <>
            <Section title='Phonebook'>
                <PhonebookForm onSubmit={this.handleSubmit}></PhonebookForm>
            </Section>

            <Section title="Contacts">
                <Filter
                    onChange={this.onChangeFilter}
                />
                <ContactList onClick={this.deleteContact}contacts={this.visibleContacts()}/>
            </Section>
      </>
    };
  };

export default App;