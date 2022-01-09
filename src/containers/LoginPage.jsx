import { React } from 'react';
import { Button } from 'reactstrap';

export default function LoginPage() {
  const onLogin = () => {
    window.open('http://localhost:3001/auth/google', '_self');
  };

  return (
    <div>
      <div>Login page</div>
      <Button onClick={onLogin}>Uloguj se</Button>
    </div>
  );
}
