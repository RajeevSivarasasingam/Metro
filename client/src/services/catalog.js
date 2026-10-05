import repairImage from '../assets/Ac_repair.jpg';
import installationImage from '../assets/Ac_install.jpg';
import maintenanceImage from '../assets/Ac_maintenance.jpg';
import cleaningImage from '../assets/Ac_cleaning.jpg';
import gasImage from '../assets/Ac_gas_refill.jpg';
import troubleshootingImage from '../assets/Ac_trouble.jpg';
const images = {'Ac_repair.jpg':repairImage,'Ac_install.jpg':installationImage,'Ac_maintenance.jpg':maintenanceImage,'Ac_cleaning.jpg':cleaningImage,'Ac_gas_refill.jpg':gasImage,'Ac_trouble.jpg':troubleshootingImage};
export const catalog = [{
  "id": "repair",
  "name": "AC Repair",
  "icon": "wrench",
  "image": "Ac_repair.jpg",
  "description": "Diagnose and repair AC problems quickly and professionally.",
  "benefits": ["Cooling and airflow checks", "Electrical and mechanical fault repairs", "Careful testing after service"]
}, {
  "id": "installation",
  "name": "AC Installation",
  "icon": "unit",
  "image": "Ac_install.jpg",
  "description": "Professional installation for new air-conditioning systems.",
  "benefits": ["Advice on placement and suitability", "Careful indoor and outdoor unit setup", "System testing and operating guidance"]
}, {
  "id": "maintenance",
  "name": "AC Maintenance",
  "icon": "settings",
  "image": "Ac_maintenance.jpg",
  "description": "Regular maintenance to improve performance and extend AC lifespan.",
  "benefits": ["Preventive system inspections", "Performance and efficiency checks", "Advice on ongoing AC care"]
}, {
  "id": "cleaning",
  "name": "AC Cleaning",
  "icon": "sparkle",
  "image": "Ac_cleaning.jpg",
  "description": "Deep cleaning services for cleaner air and better cooling performance.",
  "benefits": ["Filter and accessible coil cleaning", "Drain line and airflow checks", "Cleaner, fresher indoor comfort"]
}, {
  "id": "gas-refilling",
  "name": "Gas Refilling",
  "icon": "gauge",
  "image": "Ac_gas_refill.jpg",
  "description": "Professional refrigerant checking and gas refilling services.",
  "benefits": ["Refrigerant level assessment", "Leak checks before refilling", "Cooling performance verification"]
}, {
  "id": "troubleshooting",
  "name": "AC Troubleshooting",
  "icon": "search",
  "image": "Ac_trouble.jpg",
  "description": "Identify cooling, electrical, noise, leakage and performance problems.",
  "benefits": ["Systematic fault diagnosis", "Clear explanation of the problem", "Guidance on the right next step"]
}];
export function serviceMeta(name = '') {
  const n = name.toLowerCase();
  return catalog.find(s => n.includes(s.id.split('-')[0]) || s.id === 'cleaning' && n.includes('inspect') || s.id === 'gas-refilling' && n.includes('refill')) || catalog[0];
}
export function serviceImage(service) {
  const file = serviceMeta(service.name).image;
  return images[service.image] || service.image || images[file];
}
