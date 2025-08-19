export const dynamicParams = false;

export function generateStaticParams() {
  return [] as { id: string }[];
}

export default function ApiLayout({ children }: { children: React.ReactNode }) {
  return children;
} 