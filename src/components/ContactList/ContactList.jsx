import PropTypes from 'prop-types';

import ContactItem from './ContactItem';

const ContactList = ({ contacts, onClick }) => {
    return <ul>
        {contacts.map(({name, id, number}) => {
            return(
            <li key={id}>
                <ContactItem
                name={name}
                number={number}
                onClick={onClick}
                id={id}
                />
            </li>
            )
        })}
    </ul>
};

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          number: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    onCLick: PropTypes.func,
};