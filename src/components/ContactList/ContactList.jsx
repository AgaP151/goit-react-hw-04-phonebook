import PropTypes from 'prop-types';
import { List } from './ContactList.styled';
import { ContactItem } from './ContactItem';

export const ContactList = ({ contacts, onDeleteBtnClick }) => {
  return (
    <List>
      {contacts.map(contact => {
        return (
          <ContactItem
            id={contact.id}
            key={contact.id}
            name={contact.name}
            number={contact.number}
            onDeleteBtnClick={onDeleteBtnClick}
          />
        );
      })}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};