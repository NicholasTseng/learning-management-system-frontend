import { EducatorView } from './EducatorView';
import { LearnerView } from './LearnerView';
import { useUserStore } from '../../store';

export function DashboardPage() {
  const { user } = useUserStore();

  if (!user.id) return null;

  return user.role === 'educator' ? <EducatorView /> : <LearnerView />;
}
