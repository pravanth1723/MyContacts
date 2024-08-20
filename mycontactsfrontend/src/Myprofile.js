import React, { useContext, useState, useEffect } from 'react';
import { store } from './App';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import './myprofilestyles.css';

// Set the app element for accessibility
Modal.setAppElement('#root');

// Modal Component for Adding
const AddModal = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [token] = useContext(store);

    const addContact = () => {
        axios.post('http://localhost:5500/api/contacts/', {
            name,
            email,
            phone
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            console.log('Contact added successfully');
            onSave(res.data); // Assuming the response contains the added contact
        })
        .catch(err =>   alert('Something went wrong'));
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add Contact"
            style={{
                overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                content: {
                    position:'center',
                    width: 'fit-content',
                    height:'fit-content',
                    display:'flex',
                    flexDirection:'column',
                    padding: '50px',
                    borderRadius: '10px',
                },
            }}
        >
            <h2>Add Contact</h2>
            <>
                <label>Name:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
                <label>Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Phone:</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                    <button onClick={onClose} style={{ marginRight: '10px' }}>Cancel</button>
                    <button onClick={addContact}>Add</button>
                </div>
            </>
        </Modal>
    );
};

// Modal Component for Editing
const EditModal = ({ isOpen, onClose, contact, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setEmail(contact.email);
            setPhone(contact.phone);
        }
    }, [contact]);

    const handleSave = () => {
        if (contact) {
            onSave({ ...contact, name, email, phone });
        }
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Edit Contact"
            style={{
                overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                content: {
                    position:'center',
                    width: 'fit-content',
                    height:'fit-content',
                    display:'flex',
                    flexDirection:'column',
                    padding: '50px',
                    borderRadius: '10px',
                },
            }}
        >
            <h2>Edit Contact</h2>
            {contact ? (
                <>
                    <label>Name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                    <label>Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Phone:</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <button onClick={onClose} style={{ marginRight: '10px' }}>Cancel</button>
                        <button onClick={handleSave}>Save</button>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Modal>
    );
};

// ContactsList Component for displaying contacts
function ContactsList({ data, onEdit, onDelete }) {
    return (
        <div className='contactsClass'>
            {/* <h1>Contacts</h1> */}
            <ul className='contacts-list'>
                {data.map(contact => (
                    <li key={contact._id} >
                        
                        <h2><strong>Name:</strong> {contact.name}</h2>
                        <p><strong>Email:</strong> {contact.email}</p>
                        <p><strong>Phone:</strong> {contact.phone}</p>
                        <p>
                        <button onClick={() => onEdit(contact)} style={{ marginRight: '10px', cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                        <button onClick={() => onDelete(contact._id)} style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// MyProfile Component
const MyProfile = () => {
    const [token, setToken] = useContext(store);
    const [data, setData] = useState([]);
    const [username, setUsername] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:5500/api/contacts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    setUsername(res.data.username);
                    setData(res.data.contacts);
                    setLoading(false);
                })
                .catch(err => {
                   alert('Something went wrong');
                    setLoading(false);
                });
        }
    }, [token]);

    const handleEdit = (contact) => {
        setSelectedContact(contact);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5500/api/contacts/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setData(data.filter(contact => contact._id !== id));
                alert('Deleted Successfully');
            })
            .catch(err =>   alert('Something went wrong'));
    };

    const handleSave = (updatedContact) => {
        axios.put(`http://localhost:5500/api/contacts/${updatedContact._id}`, {
            name: updatedContact.name,
            email: updatedContact.email,
            phone: updatedContact.phone
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            setData(data.map(contact => contact._id === updatedContact._id ? updatedContact : contact));
        })
        .catch(err =>   alert('Something went wrong'));

        setIsEditModalOpen(false);
    };

    const handleAddContact = (newContact) => {
        setData([...data, newContact]);
        setIsAddModalOpen(false);
    };

    if (!token) {
        alert('session expired');
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <center>
                <h1 style={{color:'red'}}>Hi!!,{username} </h1>
              <h2>My Contacts</h2>
                <button onClick={() => setIsAddModalOpen(true)}>
                    Add Contact
                </button>
                {loading ? (
                    <p>Loading contacts...</p>
                ) : 
                (
                  <ContactsList data={data} onEdit={handleEdit} onDelete={handleDelete} />
                )}
                <button onClick={() => setToken(null)}>Logout</button>
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    contact={selectedContact}
                    onSave={handleSave}
                />
                <AddModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleAddContact}
                />
            </center>
        </div>
    );
};

export default MyProfile;
