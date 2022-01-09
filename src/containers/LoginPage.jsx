import { React } from 'react';
import GooogleButton from '../components/GoogleButton';

export default function LoginPage() {
  const onLogin = () => {
    window.open('http://localhost:3001/auth/google', '_self');
  };

  return (
    <div className="d-flex align-items-center justify-content-center h-100 w-100">
      <GooogleButton onClick={onLogin} />
    </div>
  );
}
