import { React } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

export default function HomePage({ user, setUser }) {
  const onLogout = async () => {
    await axios.get('http://localhost:3001/auth/logout', {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <div>
      <div>Home page</div>
      {user && <Button onClick={onLogout}>Logout</Button>}
    </div>
  );
}
