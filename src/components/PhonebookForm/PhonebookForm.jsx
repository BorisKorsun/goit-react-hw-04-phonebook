import { useState } from 'react';
import { Formik } from 'formik';
import FormField from './FormField'


import { SubmitBtn, PhoneBookForm } from './Phonebook.styled';

const InitialValues = {
    name: '',
    number: '',
};

export default function Phonebook ({ onSubmit }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const onInputChange = (e) => {
        const { name, value } = e.target;

        switch(name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        };
    };

    const onSubmitForm = () => {
        onSubmit({name, number});
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setNumber('');
    }

    return (
    <>
    <Formik initialValues={InitialValues} onSubmit={onSubmitForm} >
    <PhoneBookForm>
        <FormField 
        name="name"
        onChange={onInputChange}
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        />
        <FormField
        name="number"
        onChange={onInputChange}
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        />
        <SubmitBtn type="submit">Add contact</SubmitBtn>
    </PhoneBookForm>
    </Formik>
    </>
    )
};