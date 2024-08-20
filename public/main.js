// URL of the server
const API_URL = '/api';

// Function to handle GET request
// document.getElementById('getData').addEventListener('click', () => {
//     fetch(`${API_URL}/users`)
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById('response').textContent = JSON.stringify(data, null, 2);
//         })
//         .catch(error => console.error('Error:', error));
// });

// Function to handle POST request

async function postdata(e) {
    e.preventDefault();
    const newUser = {
        "username": document.getElementById('username').value,
        'email': document.getElementById('email').value,
        'password': document.getElementById('password').value
    };
    await fetch(`http://localhost:5500/api/users/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error:', error));

};
document.getElementById('postData').addEventListener('click', postdata);




// async function goto_contacts_page() {
//     window.location.href="/mycontacts.html";
//     const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage
//     if (!token) {
//         console.error('No access token available');
//         return;
//     }

//     try {
//         // Fetch data from the protected endpoint
//         const response = await fetch('http://localhost:5500/api/contacts', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data');
//         }
//         // Process the data if needed
//         const data = await response.json();
//         console.log('Fetched data:', data);
//         document.getElementById('mycontactsid').textContent ='123';

//     } 
    
//     catch (error) {
//         console.error('Error:', error);
//     }
// }
async function loginfunc(e) {
    e.preventDefault();
    const User = {
        'email': document.getElementById('email2').value,
        'password': document.getElementById('password2').value
    };
    await fetch(`http://localhost:5500/api/users/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(User),
    })
        .then(response => response.json())
        .then(data => {
            if (data.accessToken) {
                // Store the access token
                localStorage.setItem('accessToken', data.accessToken);
                window.location.href="/mycontacts.html";
                // goto_contacts_page();
                //  document.getElementById('response').textContent = localStorage.getItem('accessToken');;
                // Redirect to /api/contacts or another route
                // window.location.href = 'http://localhost:5500/api/contacts'; // or window.location.replace('/contacts');
            }
        })
        .catch(error => console.error('Error:', error));

};
document.getElementById('loginbtn').addEventListener('click', loginfunc);

// // Function to handle PUT request
// document.getElementById('putData').addEventListener('click', () => {
//     const updatedContact = { name: 'Jane Doe', email: 'jane@example.com' };
//     const contactId = 1; // Example ID

//     fetch(`${API_URL}/contacts/${contactId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedContact),
//     })
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById('response').textContent = JSON.stringify(data, null, 2);
//     })
//     .catch(error => console.error('Error:', error));
// });

// // Function to handle DELETE request
// document.getElementById('deleteData').addEventListener('click', () => {
//     const contactId = 1; // Example ID

//     fetch(`${API_URL}/contacts/${contactId}`, {
//         method: 'DELETE',
//     })
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById('response').textContent = JSON.stringify(data, null, 2);
//     })
//     .catch(error => console.error('Error:', error));
// });
