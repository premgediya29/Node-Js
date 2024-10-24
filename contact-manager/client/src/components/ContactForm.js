import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ fetchContacts, contact }) => {
  const [name, setName] = useState(contact?.name || '');
  const [email, setEmail] = useState(contact?.email || '');
  const [phone, setPhone] = useState(contact?.phone || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = { name, email, phone };
    try {
      if (contact) {
        await axios.put(`/api/contacts/${contact._id}`, contactData);
      } else {
        await axios.post('/api/contacts', contactData);
      }
      fetchContacts();
    } catch (error) {
      console.error('Error saving contact', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">{contact ? 'Update Contact' : 'Add Contact'}</button>
    </form>
  );
};

export default ContactForm;
