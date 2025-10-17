import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import Button from "../../components/common/button/Button";
import Input from "../../components/common/input/Input";
import "./Auth.css";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
const emailRegex = /\S+@\S+\.\S+/;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const next = {};
    if (formData.name.trim().length < 2) next.name = "Enter your full name";
    if (!emailRegex.test(formData.email)) next.email = "Enter a valid email";
    if (formData.password.trim().length < 6) next.password = "Min 6 characters";
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    console.log(nextErrors);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      await api.post("/auth/register", formData);
      setMessage("✅ Registered successfully! Please log in.");
      navigate("/login", { replace: true });
    } catch (error) {
      const apiMsg = error.response?.data?.message || "Registration failed";
      setMessage(`❌ ${apiMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h2 className="auth__title">Create your account</h2>
        <p className="auth__subtitle">Join and start booking</p>

        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          <div className="auth__field">
            <label htmlFor="name">Full name</label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="auth__field">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="auth__field">
            <label htmlFor="password">Password</label>
            <div className="auth__row">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <LuEye size={18} color="var(--color-text-muted)" />
                ) : (
                  <LuEyeOff size={18} color="var(--color-text-muted)" />
                )}
              </Button>
            </div>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          {message && <div className="auth__message">{message}</div>}

          <div className="auth__actions">
            <Button type="submit" variant="primary" block disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </div>
        </form>

        <div className="auth__alt">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
