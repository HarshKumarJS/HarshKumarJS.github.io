import { ArrowUpRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  href: string;
  label: string;
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  icon?: 'arrow' | 'download';
  download?: boolean;
}
export default function ActionLink({href,label,className,variant='default',icon='arrow',download}:Props) {
  const Icon = icon === 'download' ? Download : ArrowUpRight;
  return <Button asChild variant={variant} className={className}><a href={href} download={download}>{label}<Icon size={18} aria-hidden="true"/></a></Button>;
}
