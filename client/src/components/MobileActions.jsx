import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { company } from './SiteUI';
export default function MobileActions() {
  return <nav className="mobile-actions" aria-label="Quick contact actions"><a href={company.tel}><Phone aria-hidden="true" />Call</a><a href={company.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />WhatsApp</a><Link to="/booking">Book Service<ArrowRight aria-hidden="true" /></Link></nav>;
}
