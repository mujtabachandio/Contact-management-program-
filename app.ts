interface Contact {
    id: number;
    name: string;
    phone: string;
    email: string;
}

let contacts: Contact[] = [];
let contactId = 0;

function saveContacts(): void {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContacts(): void {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
        contacts = JSON.parse(storedContacts);
        contactId = contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 0;
        renderContacts();
    }
}

function addContact(): void {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (name && phone && email) {
        contacts.push({ id: contactId++, name, phone, email });
        nameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        saveContacts();
        renderContacts();
    }
}

function updateContact(id: number): void {
    const name = prompt("Enter new name:");
    const phone = prompt("Enter new phone:");
    const email = prompt("Enter new email:");

    if (name && phone && email) {
        contacts = contacts.map(contact => 
            contact.id === id ? { ...contact, name, phone, email } : contact
        );
        saveContacts();
        renderContacts();
    }
}

function deleteContact(id: number): void {
    contacts = contacts.filter(contact => contact.id !== id);
    saveContacts();
    renderContacts();
}

function renderContacts(): void {
    const contactsContainer = document.getElementById('contactsContainer')!;
    contactsContainer.innerHTML = '';

    contacts.forEach(contact => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact');
        contactDiv.innerHTML = `
            <div class="contact-info">
                <span><strong>Name:</strong> ${contact.name}</span>
                <span><strong>Phone:</strong> ${contact.phone}</span>
                <span><strong>Email:</strong> ${contact.email}</span>
            </div>
            <div class="contact-actions">
                <button class="update" onclick="window.updateContact(${contact.id})">Update</button>
                <button class="delete" onclick="window.deleteContact(${contact.id})">Delete</button>
            </div>
        `;
        contactsContainer.appendChild(contactDiv);
    });
}

// Attach functions to the global window object
(window as any).addContact = addContact;
(window as any).updateContact = updateContact;
(window as any).deleteContact = deleteContact;

// Load contacts when the page loads
window.addEventListener('load', loadContacts);
