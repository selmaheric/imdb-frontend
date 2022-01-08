export default function LoginPage() {
  const onLogin = () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };

  return (
    <div>
      <div>Login page</div>
      <button onClick={onLogin}>Uloguj se</button>
    </div>
  )
}