import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import api from '../services/api';
import useServices from '../services/useServices';
import { serviceMeta } from '../services/catalog';
import { PageHero, Field, Button, company, localToday } from '../components/SiteUI';
export default function Booking() {
  const {
    state
  } = useLocation();
  const {
    services,
    loading,
    error,
    retry
  } = useServices();
  const [selected, setSelected] = useState(state?.serviceId || '');
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (state?.serviceId) setSelected(state.serviceId);else if (state?.serviceName) {
      const match = services.find(s => serviceMeta(s.name).id === serviceMeta(state.serviceName).id);
      if (match) setSelected(match._id);
    }
  }, [state, services]);
  async function submit(e) {
    e.preventDefault();
    if (pending || loading || error) return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (!data.email?.trim()) delete data.email;
    setPending(true);
    setResult(null);
    try {
      const response = await api.post('/bookings', data, {
        timeout: 15000
      });
      setResult({
        success: true,
        text: `Booking request received${response.data.data?.bookingId ? ` — reference ${response.data.data.bookingId}` : ''}. Our team will contact you to confirm your appointment.`
      });
      form.reset();
      setSelected('');
    } catch (err) {
      setResult({
        success: false,
        text: err.response?.data?.message || 'We could not submit your booking. Your details have been kept. Please try again or call us.'
      });
    } finally {
      setPending(false);
    }
  }
  const inputs = [['customerName', 'Full Name *', 'text', 'Your full name', 'name'], ['phone', 'Phone Number *', 'tel', '077 123 4567', 'tel'], ['email', 'Email Address (optional)', 'email', 'you@example.com', 'email'], ['address', 'Service Address *', 'text', 'Your address in Jaffna', 'street-address']];
  return <><PageHero background="booking" title="Book a Service" description="Tell us about your AC and choose a preferred time. We'll take care of the next steps." /><section className="section"><div className="container booking-layout"><aside className="booking-aside"><span className="eyebrow">LET'S GET YOU COMFORTABLE</span><h2>One request.<br />Expert AC care.</h2><p>Complete the form to request a technician visit. We'll contact you to confirm the service and appointment.</p><div className="contact-note">Need help choosing a service? Call us and describe the problem.</div><Button href={company.tel} icon={Phone}>Call {company.phone}</Button></aside><form className="inquiry-form" onSubmit={submit} aria-busy={pending}><h2>Your Service Request</h2><p>Fields marked * are required. We can contact you by phone; email is optional.</p>{loading && <p role="status">Loading available services…</p>}{error && <div role="alert" className="status-note">{error} <button type="button" onClick={retry}>Try again</button></div>}{!loading && !error && services.length === 0 && <p role="status">Online booking is not available at the moment. Please call us.</p>}<div className="form-grid">{inputs.map(([id, label, type, placeholder, autoComplete]) => <Field key={id} id={id} label={label} full={id === 'address'}><input id={id} name={id} type={type} placeholder={placeholder} autoComplete={autoComplete} required={id !== 'email'} maxLength={id === 'address' ? 300 : 150} /></Field>)}<Field id="booking-service" label="Service Type *"><select id="booking-service" name="service" required value={selected} onChange={e => setSelected(e.target.value)} disabled={loading || !!error}><option value="">Select a service</option>{services.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}</select></Field><Field id="acType" label="AC Type *"><select id="acType" name="acType" required defaultValue=""><option value="">Select AC type</option>{['Split AC', 'Window AC', 'Central AC', 'Cassette AC', 'Other'].map(t => <option key={t}>{t}</option>)}</select></Field><Field id="acBrand" label="AC Brand (optional)"><input id="acBrand" name="acBrand" placeholder="e.g. LG, Daikin, Samsung" maxLength={100} /></Field><Field id="problemDescription" label="Describe Your AC Problem *" full><textarea id="problemDescription" name="problemDescription" required placeholder="Tell us what isn't working…" maxLength={2000} /></Field><Field id="preferredDate" label="Preferred Date *"><input id="preferredDate" name="preferredDate" type="date" required min={localToday()} /></Field><Field id="preferredTime" label="Preferred Time *"><select id="preferredTime" name="preferredTime" required defaultValue=""><option value="">Choose a time slot</option>{['8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 2:00 PM', '2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM'].map(t => <option key={t}>{t}</option>)}</select></Field><Field id="notes" label="Additional Notes (optional)" full><textarea id="notes" name="notes" placeholder="Access instructions or anything else we should know" maxLength={1000} /></Field></div>{result && <div className={`form-result ${result.success ? 'success' : 'error'}`} role={result.success ? 'status' : 'alert'}>{result.text}</div>}<button className="button primary form-submit" type="submit" disabled={pending || loading || !!error || !services.length}>{pending ? 'Submitting request…' : 'Submit Booking Request'}<ArrowRight size={17} aria-hidden="true" /></button><p className="fine-print">Your date and time are preferences. The appointment is confirmed after our team contacts you.</p></form></div></section></>;
}


