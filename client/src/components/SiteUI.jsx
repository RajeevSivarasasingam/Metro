import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import logoOnly from '../assets/logo_only.png';
export const company = {
  phone: '077 175 4835',
  tel: 'tel:+94771754835',
  email: 'metrocoolengineering@gmail.com',
  whatsapp: 'https://wa.me/94771754835',
  map: 'https://www.google.com/maps/search/?api=1&query=Kuppilan+North%2C+Kuppilan%2C+Jaffna%2C+Sri+Lanka'
};
export function Brand() {
  return <Link to="/" className="brand" aria-label="Metro Cool Engineering home"><span className="brand-mark brand-image"><img src={logoOnly} alt="" width="52" height="52" /></span><span className="brand-name"><strong>METRO COOL</strong><small>ENGINEERING</small></span></Link>;
}
export function Button({
  to,
  href,
  children,
  variant = 'primary',
  icon: Icon = ArrowRight,
  ...props
}) {
  const content = <>{children}{Icon && <Icon size={17} aria-hidden="true" />}</>;
  return to ? <Link to={to} className={`button ${variant}`} {...props}>{content}</Link> : <a href={href} className={`button ${variant}`} {...props}>{content}</a>;
}
export function PageHero({
  title,
  description,
  label,
  background
}) {
  return <section className={`page-hero${background ? ` page-hero-photo page-hero-${background}` : ''}`}><div className="container"><div className="breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span>{label || title}</span></div><span className="eyebrow">METRO COOL ENGINEERING</span><h1>{title}</h1><p>{description}</p></div></section>;
}
export function CTA({
  title = 'Having Trouble With Your AC?',
  description = 'Contact Metro Cool Engineering today for professional AC service.',
  contact = false
}) {
  return <section className="cta-wrap"><div className="container"><div className="cta-banner"><div><h2>{title}</h2><p>{description}</p></div><div className="button-row">{contact ? <Button to="/contact" variant="secondary">Contact Our Team</Button> : <><Button href={company.tel} variant="secondary" icon={Phone}>Call {company.phone}</Button><Button to="/booking" variant="outline">Book a Service</Button></>}</div></div></div></section>;
}
export function Field({
  id,
  label,
  children,
  full = false
}) {
  return <div className={`field${full ? ' full' : ''}`}><label htmlFor={id}>{label}</label>{children}</div>;
}
export function localToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}


