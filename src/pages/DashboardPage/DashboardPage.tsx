import { EducatorView } from './EducatorView';
import { LearnerView } from './LearnerView';
import { useUserStore } from '../../store';

export function DashboardPage() {
  const { user } = useUserStore();

  return user.role === 'educator' ? <EducatorView /> : <LearnerView />;
}
