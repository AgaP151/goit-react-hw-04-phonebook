import { useState } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import { Container, MainHeader, SubHeader } from './App.styled';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultContacts } from '../utils/defaultContact';
import { notifySettings } from '../utils/notifySettings';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';


export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', defaultContacts);
  const [filter, setFilter] = useState('');

  const onAddBtnClick = FormData => {
    const { name, number } = FormData;
    const id = nanoid();

    const includesName = contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (includesName) {
      return Notiflix.Notify.warning(
        `${name} is already in contacts`,
        notifySettings
      );
    } else {
      const contact = { id, name, number };
      setContacts(prevContacts => [...prevContacts, contact]);
      Notiflix.Notify.success(
        `${name} was successfully added to your contacts`,
        notifySettings
      );
    }
  };

  const onDeleteBtnClick = (id, name) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
    Notiflix.Notify.info(
      `${name} was successfully deleted from your contacts`,
      notifySettings
    );
  };

  const onFilterChange = event => {
    setFilter(event.target.value);
  };

  const filterContacts = () => {
    const query = filter.toLocaleLowerCase();

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(query)
    );

    if (query && !filteredContacts.length) {
      Notiflix.Notify.warning(
        'No contatcs matching your request',
        notifySettings
      );
    }

    return filteredContacts;
  };

  return (
    <Container>
      <MainHeader>Phonebook</MainHeader>
      <ContactForm onAddBtnClick={onAddBtnClick} />
      <SubHeader>Contacts</SubHeader>
      <Filter value={filter} onChange={onFilterChange} />
      <ContactList
        contacts={filterContacts()}
        onDeleteBtnClick={onDeleteBtnClick}
      />
    </Container>
  );
};
