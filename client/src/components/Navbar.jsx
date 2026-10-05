import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import { Brand, Button, company } from './SiteUI';
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const {
    pathname
  } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  const links = [['/', 'Home'], ['/services', 'Services'], ['/about', 'About Us'], ['/contact', 'Contact Us']].map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>);
  return <div className="site-header"><div className="topline"><div className="container"><span><MapPin size={12} aria-hidden="true" /> YOUR LOCAL AC SERVICE TEAM IN JAFFNA</span><a href={`mailto:${company.email}`}><Mail size={12} aria-hidden="true" /> {company.email}</a></div></div><header className="header"><div className="container header-inner"><Brand /><nav className="nav" aria-label="Main navigation">{links}</nav><div className="header-actions"><a className="phone-link" href={company.tel}><Phone size={17} aria-hidden="true" />{company.phone}</a><Button to="/booking">Book a Service</Button><button type="button" className="icon-button menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)} onKeyDown={e => {
            if (e.key === 'Escape') setOpen(false);
          }}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div></div><nav id="mobile-nav" className={`mobile-nav${open ? ' open' : ''}`} aria-label="Mobile navigation" onKeyDown={e => {
        if (e.key === 'Escape') {
          setOpen(false);
          document.querySelector('.menu-toggle')?.focus();
        }
      }}>{links}<Button to="/booking">Book a Service</Button></nav></header></div>;
}
