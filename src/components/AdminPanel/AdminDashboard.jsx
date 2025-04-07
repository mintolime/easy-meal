import { useAdminStore } from '../store/adminStore';

export const AdminDashboard = (props) => {
  const { className } = props;
  const { isAdmin } = useAdminStore();
  console.log('isAdmin', isAdmin);
  return <div className={className}>админка</div>;
};
