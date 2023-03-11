import useSignup from 'hooks/useSignup';
import { useState } from 'react';
import './Signup.css';

interface SignupProps {}

const Signup = ({ }: SignupProps) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>("");

  const { signup, error, isLoading } = useSignup();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(null);

    let innerImage = e.target.files && e.target.files.length ? e.target.files[0] : null;

    if (!innerImage) {
      setImageError("Please select a file");
      return;
    }

    if (!innerImage.type.includes("image")) {
      setImageError("Selected file must be an image");
      return;
    }

    if (innerImage.size > 100000) {
      setImageError("Image file size must be less than 100Kb");
      return;
    }

    setImageError("");
    setImage(innerImage);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signup(email, password, displayName, image!);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
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
          onChange={handleFile}
        />

        {imageError && <div className="error">{imageError}</div>}
      </label>

      <button
        className="btn"
        disabled={isLoading}
      >{isLoading ? "Loading" : "Sign up"}</button>

      {error && <div className="error">{error}</div>}

    </form>
  );
}

export default Signup;
