
import React from 'react';

const EmergencyContacts = () => {
  const contacts = [
    { name: 'Police Chief', phone: '123-456-7890' },
    { name: 'Fire Department', phone: '234-567-8901' },
    { name: 'Hospital Emergency', phone: '345-678-9012' },
    { name: 'City Mayor', phone: '456-789-0123' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Emergency Contacts</h1>
      <div className='flex '>
      <ul >
        {contacts.map((contact, index) => (
          <li key={index} className="mb-2">
            <strong>{contact.name}</strong>: <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default EmergencyContacts;
