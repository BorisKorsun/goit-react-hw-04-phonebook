const ContactItem = ({ name, number, onClick, id}) => {
    return (
        <>
         <p>{name}: {number}</p>
        <button id={id} onClick={e => onClick(e.currentTarget.id)} type="button">Delete contact</button>
        </>
    )
};

export default ContactItem;
