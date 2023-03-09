import { useState } from 'react';
import './Signup.css';

interface SignupProps {}

const Signup = ({ }: SignupProps) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [image, setImage] = useState<null>(null);

  return (
    <form className="auth-form">
      <h2>Sign up</h2>

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

      <label>
        <span>Display name:</span>
        <input
          type="text"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>

      <label>
        <span>Profile name:</span>
        <input
          type="file"
          required
        />
      </label>

      <button className="btn">Sign up</button>

    </form>
  );
}

export default Signup;
