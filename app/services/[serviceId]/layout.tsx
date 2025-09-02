export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { serviceId: 'all-services' },
    { serviceId: 'marriage' },
    { serviceId: 'career' },
    { serviceId: 'health' },
    { serviceId: 'marriage' },
    { serviceId: 'career' },
    { serviceId: 'health' },
    { serviceId: 'vastu' },
    { serviceId: 'karmakanda' },
    { serviceId: 'kundali-creation' },
    { serviceId: 'gemstone' },
  ];
}

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
} 