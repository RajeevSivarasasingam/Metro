import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import api from '../services/api';
import { catalog, serviceMeta, serviceImage } from '../services/catalog';
import { PageHero, Button } from '../components/SiteUI';
export default function ServiceDetail() {
  const {
    id
  } = useParams();
  const local = catalog.find(s => s.id === id);
  const [service, setService] = useState(local || null);
  const [loading, setLoading] = useState(!local);
  const [error, setError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setService(local || null);
    setLoading(!local);
    setError(false);
    const request = local ? api.get('/services', {
      signal: controller.signal,
      timeout: 10000
    }) : api.get(`/services/${id}`, {
      signal: controller.signal,
      timeout: 10000
    });
    request.then(r => {
      const result = local ? r.data.data.find(s => serviceMeta(s.name).id === local.id) : r.data.data;
      if (result) setService(result);
    }).catch(() => {
      if (!controller.signal.aborted && !local) setError(true);
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false);
    });
    return () => controller.abort();
  }, [id]);
  if (loading) return <section className="section container" role="status">Loading service details…</section>;
  if (error || !service) return <section className="section container"><h1>Service unavailable</h1><p>We couldn't load this service. Please try again from our service list.</p><Button to="/services">Back to Services</Button></section>;
  const meta = serviceMeta(service.name);
  return <><PageHero title={service.name} description={service.shortDescription || service.description} label="Services" /><section className="section"><div className="container about-grid"><img className="about-photo" src={serviceImage(service)} alt={service.name} /><div className="about-copy"><span className="eyebrow">CARE FOR YOUR COMFORT</span><h2>Professional {service.name.toLowerCase()}</h2><p>{service.description}</p><ul className="check-list">{(service.features?.length ? service.features : meta.benefits).map(b => <li key={b}><Check aria-hidden="true" />{b}</li>)}</ul><Button to="/booking" state={service._id ? {
            serviceId: service._id
          } : {
            serviceName: service.name
          }}>Book This Service</Button><p><Link className="text-link" to="/services">Back to all services</Link></p></div></div></section></>;
}
