import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { PageHero, Button, Field, company, localToday } from '../components/SiteUI';
import { catalog } from '../services/catalog';
export default function Contact() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState(null);
  async function submit(e) {
    e.preventDefault();
    if (pending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setResult(null);
    try {
      await api.post('/contact', {
        name: data.get('name').trim(),
        email: data.get('email').trim(),
        phone: data.get('phone').trim(),
        subject: `Service inquiry: ${data.get('service')}`,
        message: `${data.get('message').trim()}${data.get('date') ? `\n\nPreferred date: ${data.get('date')}` : ''}`
      }, {
        timeout: 15000
      });
      setResult({
        success: true,
        text: 'Your service request has been received. Our team will contact you to confirm the next steps.'
      });
      form.reset();
    } catch (error) {
      setResult({
        success: false,
        text: error.response?.data?.message || 'Your request could not be sent. Your details are still here. Please try again or contact us by phone or WhatsApp.'
      });
    } finally {
      setPending(false);
    }
  }
  return <><PageHero background="contact" title="Let's Get Your AC Sorted." description="Tell us what you need. We'll help you take the next step." label="Contact Us" /><section className="section contact-section"><div className="container contact-grid"><div className="contact-copy"><span className="eyebrow">WE'RE HERE TO HELP</span><h2>Get In Touch</h2><p>Have a cooling problem or planning a new installation? Talk to our team in Jaffna.</p><div className="contact-list"><div className="contact-card"><span className="icon-box"><Phone aria-hidden="true" /></span><div><small>Give us a call</small><a href={company.tel}>{company.phone}</a></div></div><div className="contact-card"><span className="icon-box"><Mail aria-hidden="true" /></span><div><small>Send an email</small><a href={`mailto:${company.email}`}>{company.email}</a></div></div><div className="contact-card"><span className="icon-box"><MapPin aria-hidden="true" /></span><div><small>Our location</small><address>Kuppilan North, Kuppilan,<br />Jaffna, Sri Lanka</address></div></div></div><div className="button-row"><Button href={company.tel} icon={Phone}>Call Now</Button><Button href={company.whatsapp} variant="outline" icon={MessageCircle} target="_blank" rel="noopener noreferrer">WhatsApp Us</Button></div><div className="contact-note">Not sure which service to choose? Describe what you're experiencing and we'll help identify the right service.</div></div><form className="inquiry-form" onSubmit={submit} aria-busy={pending}><h2>Request a Service</h2><p>A few details will help us understand your AC needs.</p><div className="form-grid"><Field id="name" label="Full Name *"><input id="name" name="name" placeholder="Your full name" autoComplete="name" required maxLength={100} /></Field><Field id="phone" label="Phone Number *"><input id="phone" name="phone" type="tel" placeholder="077 123 4567" autoComplete="tel" required minLength={7} maxLength={20} /></Field><Field id="email" label="Email Address *" full><input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required maxLength={150} /></Field><Field id="service" label="Select Service *"><select id="service" name="service" defaultValue="" required><option value="" disabled>Choose a service</option>{catalog.map(s => <option key={s.id}>{s.name}</option>)}<option>Not sure — help me choose</option></select></Field><Field id="date" label="Preferred Date (optional)"><input id="date" name="date" type="date" min={localToday()} aria-describedby="date-help" /><small id="date-help">Subject to availability.</small></Field><Field id="message" label="Message / Describe Your AC Problem *" full><textarea id="message" name="message" placeholder="For example: My bedroom AC isn't cooling. I'm in Kuppilan…" required maxLength={2000} /></Field></div>{result && <div className={`form-result ${result.success ? 'success' : 'error'}`} role={result.success ? 'status' : 'alert'}>{result.text}</div>}<button className="button primary form-submit" type="submit" disabled={pending}>{pending ? 'Sending request…' : 'Send Service Request'}<ArrowRight size={17} aria-hidden="true" /></button><p className="fine-print">Your preferred date is a request. Our team will confirm availability with you.</p></form></div></section><section className="map-section"><div className="container"><div className="location-map"><div className="map-pin"><span className="icon-box"><MapPin aria-hidden="true" /></span><h3>Find us in Kuppilan</h3><p>Kuppilan North, Kuppilan, Jaffna, Sri Lanka</p><a href={company.map} target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a></div><span className="map-label">Location illustration · not a geographic map</span></div></div></section></>;
}

