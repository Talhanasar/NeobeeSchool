import { useRouter } from 'expo-router';
import { PortalOverviewParent, PortalOverviewTeacher } from '@/components';
import { useSession } from '@/lib/session';

export default function PortalIndexScreen() {
  const { role, signOut } = useSession();
  const router = useRouter();

  const onSignOut = () => {
    signOut();
    router.replace('/');
  };

  if (role === 'teacher') {
    return <PortalOverviewTeacher onSignOut={onSignOut} />;
  }
  return <PortalOverviewParent onSignOut={onSignOut} />;
}
