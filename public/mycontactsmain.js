const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage
async function goto_contacts_page() {
    // window.location.href="/mycontacts.html";
    if (!token) {
        console.error('No access token available');
        return;
    }

    try {
        // Fetch data from the protected endpoint
        const response = await fetch('http://localhost:5500/api/contacts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        // Process the data if needed
        const data = await response.json();
        console.log('Fetched data:', data);
        document.getElementById('mycontactsid').textContent =data[0]['email']+'\n'+data[1];

    } 
    
    catch (error) {
        console.error('Error:', error);
    }
}

async function addNew(){
    console.log('hi');
    // e.preventDefault();
    const newContact = {
        "name": document.getElementById('name').value,
        'email': document.getElementById('email').value,
        'phone': document.getElementById('phno').value
    };
    await fetch(`http://localhost:5500/api/contacts/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('mycontactsid').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error:', error));

}
// document.getElementById('addbtn').addEventListener('click', addNew);
window.onload=goto_contacts_page;