import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "../alertas/Alert";
import "../../style/components/auth/login.css";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPassword(user.email);
      setError("We sent you an email. Check your inbox");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div id="login">
      {error && <Alert message={error} />}

      <img
        className="imgLogin"
        src="https://p4.wallpaperbetter.com/wallpaper/818/376/875/oklahoma-landscape-sky-field-wallpaper-preview.jpg"
      />

      <div className="divForm">
        <form onSubmit={handleSubmit}>

          <div>
            <h1>Login</h1>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="example@example.com"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="*************"
            />
          </div>

          <div>
            <button type="submit">Iniciar Sesión</button>
          </div>

          <div>
            <p>
              ¿Aún no tienes una cuenta? &nbsp;
              <Link
                to="/register"
              >
                Registro
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
