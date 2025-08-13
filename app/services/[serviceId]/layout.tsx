export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { serviceId: 'kundali' },
    { serviceId: 'marriage' },
    { serviceId: 'career' },
    { serviceId: 'health' },
  ];
}

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
} 