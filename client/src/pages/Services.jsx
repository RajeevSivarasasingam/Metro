import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, AirVent, Settings, Sparkles, Gauge, Search, ArrowRight, Check } from 'lucide-react';
import { PageHero, CTA, Button } from '../components/SiteUI';
import { catalog, serviceMeta, serviceImage } from '../services/catalog';
import useServices from '../services/useServices';
const icons = {
  wrench: Wrench,
  unit: AirVent,
  settings: Settings,
  sparkle: Sparkles,
  gauge: Gauge,
  search: Search
};
export function ServiceCard({
  service,
  index = 0,
  detailed = false
}) {
  const meta = serviceMeta(service.name);
  const Icon = icons[meta.icon];
  const id = service._id || service.id;
  const booking = service._id ? {
    serviceId: service._id
  } : {
    serviceName: service.name
  };
  return detailed ? <article className="detail-card" id={`service-${id}`}><div className="detail-image"><img src={serviceImage(service)} alt={`${service.name} work on an air-conditioning system`} loading="lazy" /><span className="icon-box"><Icon aria-hidden="true" /></span></div><div className="detail-body"><h2>{service.name}</h2><p>{service.shortDescription || service.description}</p><ul className="check-list">{(service.features?.length ? service.features : meta.benefits).map(b => <li key={b}><Check aria-hidden="true" />{b}</li>)}</ul><div className="detail-bottom"><Button to="/booking" state={booking}>Request Service</Button><Link className="text-link" to={`/services/${id}`}>Learn More <ArrowRight size={16} aria-hidden="true" /></Link></div></div></article> : <article className="service-card"><div className="service-card-image"><img src={serviceImage(service)} alt={`${service.name} work on an air-conditioning system`} width="640" height="400" loading="lazy" /></div><div className="service-card-top"><span className="icon-box"><Icon aria-hidden="true" /></span><span className="card-number">{String(index + 1).padStart(2, '0')}</span></div><h3>{service.name}</h3><p>{service.shortDescription || service.description}</p><Link to={`/services/${id}`} className="text-link service-card-link" aria-label={`Learn more about ${service.name}`}>Learn More <ArrowRight size={17} aria-hidden="true" /></Link></article>;
}
export function ServicesGrid({
  detailed = false
}) {
  const {
    services,
    loading,
    error,
    retry
  } = useServices();
  const items = services.length ? services : catalog;
  return <>{detailed && error && <div className="status-note" role="status">Showing our service guide. Online booking availability is temporarily unavailable. <button type="button" onClick={retry}>Try again</button></div>}<div className={detailed ? 'detail-grid' : 'services-grid'} aria-busy={loading}>{items.map((service, index) => <ServiceCard key={service._id || service.id} service={service} index={index} detailed={detailed} />)}</div></>;
}
export default function Services() {
  return <><PageHero background="services" title="Our Services" description="Professional air-conditioning solutions for homes and businesses." /><section className="section"><div className="container"><ServicesGrid detailed /></div></section><CTA title="Not Sure What's Wrong With Your AC?" description="Tell us the problem and we'll help identify the right service." contact /></>;
}



