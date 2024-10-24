import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <h2>Contact List</h2>
      <ContactForm fetchContacts={fetchContacts} contact={editingContact} />
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            <h3>{contact.name}</h3>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <button onClick={() => setEditingContact(contact)}>Edit</button>
            <button onClick={() => deleteContact(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
