import axios from 'axios';

export default function HomePage({ user, setUser }) {
  const onLogout = async () => {
   await axios.get('http://localhost:3001/auth/logout', {
      withCredentials: true
    });
    setUser(null);
  }

  return (
    <div>
      <div>Home page</div>
      {user && <button onClick={onLogout}>Logout</button>}
    </div>
  )
}