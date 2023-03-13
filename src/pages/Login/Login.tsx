import { useLogIn } from 'hooks/useLogIn';
import { useState } from 'react';
import './Login.css';

interface LoginProps {}

const Login = ({ }: LoginProps) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isLoading, error, login } = useLogIn();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(email, password);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <button
        className="btn"
        disabled={isLoading}
      >{isLoading ? "Loading" : "Login"}</button>

      {error && <div className="error">{error}</div>}

    </form>
  );
}

export default Login;
