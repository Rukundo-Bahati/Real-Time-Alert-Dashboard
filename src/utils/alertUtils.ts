import { Alert } from '@/types/Alert';

export const getSeverity = (message: string): Alert['severity'] => {
  const msg = message.toLowerCase();
  if (msg.includes('critical') || msg.includes('unauthorized') || msg.includes('attack')) return 'critical';
  if (msg.includes('warning') || msg.includes('suspicious')) return 'warning';
  if (msg.includes('success') || msg.includes('resolved')) return 'success';
  return 'info';
};

export const getSeverityBadgeVariant = (severity: Alert['severity']) => {
  switch (severity) {
    case 'critical': return 'destructive';
    case 'warning': return 'secondary';
    case 'success': return 'default';
    default: return 'outline';
  }
};

export const getSeverityColor = (severity: Alert['severity']) => {
  return `text-alert-${severity}`;
};
