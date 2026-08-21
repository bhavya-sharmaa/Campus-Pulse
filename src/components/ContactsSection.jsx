import { CONTACTS_DATA } from './contactsData';

export default function ContactsSection({ handleCopyPhone }) {
  return (
    <div className="contacts-wrapper">
      <div className="section-header">
        <h2 className="section-title">Emergency & Directory Contacts</h2>
        <p className="section-subtitle">Instant connection to vital student services, campus guards, and medical staff.</p>
      </div>

      <div className="contact-grid">
        {CONTACTS_DATA.map((contact) => (
          <div key={contact.id} className="glass-card contact-card">
            <div className="contact-avatar">{contact.emoji}</div>
            <h3 className="contact-title">{contact.name}</h3>
            <span className="contact-role">{contact.role}</span>
            <div className="contact-number">{contact.phone}</div>
            <button
              className="contact-action-btn"
              onClick={() => handleCopyPhone(contact.phone, contact.name)}
            >
              📋 Copy Phone Number
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
