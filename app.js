var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var contacts = [];
var contactId = 0;
function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}
function loadContacts() {
    var storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
        contacts = JSON.parse(storedContacts);
        contactId = contacts.length ? Math.max.apply(Math, contacts.map(function (c) { return c.id; })) + 1 : 0;
        renderContacts();
    }
}
function addContact() {
    var nameInput = document.getElementById('name');
    var phoneInput = document.getElementById('phone');
    var emailInput = document.getElementById('email');
    var name = nameInput.value.trim();
    var phone = phoneInput.value.trim();
    var email = emailInput.value.trim();
    if (name && phone && email) {
        contacts.push({ id: contactId++, name: name, phone: phone, email: email });
        nameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        saveContacts();
        renderContacts();
    }
}
function updateContact(id) {
    var name = prompt("Enter new name:");
    var phone = prompt("Enter new phone:");
    var email = prompt("Enter new email:");
    if (name && phone && email) {
        contacts = contacts.map(function (contact) {
            return contact.id === id ? __assign(__assign({}, contact), { name: name, phone: phone, email: email }) : contact;
        });
        saveContacts();
        renderContacts();
    }
}
function deleteContact(id) {
    contacts = contacts.filter(function (contact) { return contact.id !== id; });
    saveContacts();
    renderContacts();
}
function renderContacts() {
    var contactsContainer = document.getElementById('contactsContainer');
    contactsContainer.innerHTML = '';
    contacts.forEach(function (contact) {
        var contactDiv = document.createElement('div');
        contactDiv.classList.add('contact');
        contactDiv.innerHTML = "\n            <div class=\"contact-info\">\n                <span><strong>Name:</strong> ".concat(contact.name, "</span>\n                <span><strong>Phone:</strong> ").concat(contact.phone, "</span>\n                <span><strong>Email:</strong> ").concat(contact.email, "</span>\n            </div>\n            <div class=\"contact-actions\">\n                <button class=\"update\" onclick=\"window.updateContact(").concat(contact.id, ")\">Update</button>\n                <button class=\"delete\" onclick=\"window.deleteContact(").concat(contact.id, ")\">Delete</button>\n            </div>\n        ");
        contactsContainer.appendChild(contactDiv);
    });
}
// Attach functions to the global window object
window.addContact = addContact;
window.updateContact = updateContact;
window.deleteContact = deleteContact;
// Load contacts when the page loads
window.addEventListener('load', loadContacts);
