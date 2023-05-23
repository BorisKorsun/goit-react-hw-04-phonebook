import { useEffect, useState, useRef } from "react";
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

export default function App() {
    const [contacts, setContacts] = useState(() => {
        return defaultContacts;
    })
    const [filter, setFilter] = useState('');
    const isFirstRender = useRef(true)

    useEffect(() => {
        const savedContacts = JSON.parse(window.localStorage.getItem('contacts'))
        if (!savedContacts) {
            return;
        };
        setContacts(savedContacts);
    }, []);

    useEffect(() => {
        if (isFirstRender.current){
            isFirstRender.current = false;
            return;
        };
        return localStorage.setItem('contacts', JSON.stringify(contacts))
    }, [contacts]);

    const handleSubmit = ({ name, number }) => {
        const isContact = contacts.find(contact => {
            return contact.name === name;
        })

        if(isContact) {
            alert(`${name} is already exists`);
            return;
        };

        setContacts(s => {
            return [{
                name,
                number,
                id: nanoid()
            } ,...s]
        });
    };

    const onChangeFilter = (e) => {
        const filter = e.currentTarget.value

        setFilter(filter);
    };

    const visibleContacts = () => {
        const normalizedFilter = filter.toLowerCase()

        const filteredContacts = contacts.filter(({ name }) => {
            return name.toLowerCase().includes(normalizedFilter)
        });
        return filteredContacts;
    };

    const deleteContact = (id) => {
        setContacts(s => {
            const contactsAfterDelete = contacts.filter((contact) => {
                return contact.id !== id;
            });
            return [...contactsAfterDelete]
        });
    };

    return (
        <>
            <Section title='Phonebook'>
                <PhonebookForm onSubmit={handleSubmit}></PhonebookForm>
            </Section>

            <Section title="Contacts">
                <Filter
                    onChange={onChangeFilter}
                />
                <ContactList onClick={deleteContact}contacts={visibleContacts()}/>
            </Section>
      </>
    )
  };