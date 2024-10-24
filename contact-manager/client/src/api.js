import axios from 'axios';

export const registerUser = (userData) => axios.post('/api/auth/register', userData);
export const loginUser = (userData) => axios.post('/api/auth/login', userData);
export const fetchContacts = () => axios.get('/api/contacts');
export const addContact = (contactData) => axios.post('/api/contacts', contactData);
export const updateContact = (id, contactData) => axios.put(`/api/contacts/${id}`, contactData);
export const deleteContact = (id) => axios.delete(`/api/contacts/${id}`);
