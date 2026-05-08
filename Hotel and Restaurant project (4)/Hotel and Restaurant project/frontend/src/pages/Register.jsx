import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Hotel,
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Eye,
  EyeOff
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    address: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    // Full Name: Only letters and spaces
    if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = 'Full Name should only contain letters and spaces.';
    }

    // Email Address: Valid email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Mobile Number: 10 digits
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile Number must be exactly 10 digits.';
    }
    
    // Address validation: Required and at least 10 characters
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required.';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please enter a complete address (at least 10 characters).';
    }

    // Username: Min 3 characters, no spaces
    if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long.';
    } else if (/\s/.test(formData.username)) {
      newErrors.username = 'Username cannot contain spaces.';
    }

    // Password: Min 8 characters, at least one letter and one number
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one letter and one number.';
    }

    // Confirm Password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Strong validation for Mobile Number: Only allow digits
    if (name === 'mobileNumber') {
      const numericValue = value.replace(/\D/g, ''); // Remove non-digits
      if (numericValue.length <= 10) { // Limit to 10 digits
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validate()) {
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/auth/register', { 
        fullName: formData.fullName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        address: formData.address,
        username: formData.username, 
        password: formData.password 
      });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
   } catch (err) {
  console.error(err);

  setError(
    err.response?.data?.message ||
    'Registration failed. Please try again.'
  );
}
  };

  const renderError = (fieldName) => {
    if (errors[fieldName]) {
      return (
        <div className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-fade-in">
          <AlertCircle size={12} /> {errors[fieldName]}
        </div>
      );
    }
    return null;
  };

  
return (
  <div
    className="min-h-screen flex"
    style={{
      background: "linear-gradient(135deg, #0f172a 0%, #111827 100%)"
    }}
  >
    {/* LEFT SIDE */}
    <div
     className="hidden lg:flex lg:w-[50%] items-center justify-center px-12 py-16"
      style={{
        background:
          "linear-gradient(135deg, #312e81 0%, #1e1b4b 50%, #0f172a 100%)"
      }}
    >
      <div
        style={{
          maxWidth: "620px",
          width: "100%"
        }}
      >
        <h1
          style={{
            fontSize: "4.5rem",
            fontWeight: "800",
            color: "white",
            marginBottom: "1.5rem",
            lineHeight: "1"
          }}
        >
          LuxeStay
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "1.1rem",
            lineHeight: "1.9",
            marginBottom: "2.5rem"
          }}
        >
          Luxury stays, fine dining, and unforgettable experiences — all in one place.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            color: "#ddd6fe",
            fontSize: "1rem",
            marginBottom: "2.5rem"
          }}
        >
           <div>✨ Luxury Suites & Premium Rooms</div>
  <div>🍽 Fine Dining & Restaurant Booking</div>
  <div>🎉 Event & Wedding Reservations</div>
  <div>🛎 24/7 Personalized Guest Service</div>
</div>

        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          alt="Luxury Hotel"
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
            borderRadius: "28px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.45)"
          }}
        />
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="w-full lg:w-[50%] flex items-center justify-center px-6 py-16">
      <div
        className="card glass animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "620px",
          margin: "0 auto",
          padding: "3rem",
          borderRadius: "24px",
          background: "rgba(17, 24, 39, 0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.4)"
        }}
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 text-primary">
            <Hotel size={52} />
          </div>

          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: "700",
              color: "white"
            }}
          >
            Create Account
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "0.5rem"
            }}
          >
            Join LuxeStay for the ultimate experience
          </p>
        </div>

        {error && (
          <div
            className="mb-6 text-left"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#ef4444",
              padding: "1rem",
              borderRadius: "0.75rem"
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="mb-6 text-left flex items-center gap-2"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "#22c55e",
              padding: "1rem",
              borderRadius: "0.75rem"
            }}
          >
            <CheckCircle size={20} /> {success}
          </div>
        )}

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4 text-left"
        >
          <div className="form-group">
            <label>Full Name</label>
            <div className="relative flex items-center">
              <User
                className="absolute left-3 text-text-muted"
                size={20}
              />
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                style={{
                  paddingLeft: "2.75rem",
                  borderColor: errors.fullName ? "#ef4444" : ""
                }}
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            {renderError("fullName")}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="relative flex items-center">
              <Mail
                className="absolute left-3 text-text-muted"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                style={{
                  paddingLeft: "2.75rem",
                  borderColor: errors.email ? "#ef4444" : ""
                }}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {renderError("email")}
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <div className="relative flex items-center">
              <Phone
                className="absolute left-3 text-text-muted"
                size={20}
              />
              <input
                type="tel"
                name="mobileNumber"
                placeholder="10 digit number"
                style={{
                  paddingLeft: "2.75rem",
                  borderColor: errors.mobileNumber
                    ? "#ef4444"
                    : ""
                }}
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
            {renderError("mobileNumber")}
          </div>

          <div className="form-group">
            <label>Address</label>
            <div className="relative flex items-center">
              <MapPin
                className="absolute left-3 top-4 text-text-muted"
                size={20}
              />

              <textarea
                name="address"
                placeholder="Your full address"
                rows="2"
                className="w-full"
                style={{
                  padding: "0.75rem 0.75rem 0.75rem 2.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  borderColor: errors.address
                    ? "#ef4444"
                    : ""
                }}
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            {renderError("address")}
          </div>

          <div className="form-group">
            <label>Username</label>
            <div className="relative flex items-center">
              <User
                className="absolute left-3 text-text-muted"
                size={20}
              />
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                style={{
                  paddingLeft: "2.75rem",
                  borderColor: errors.username
                    ? "#ef4444"
                    : ""
                }}
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            {renderError("username")}
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="relative flex items-center">
              <Lock
                className="absolute left-3 text-text-muted"
                size={20}
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Min 8 chars, letters & numbers"
                style={{
                  paddingLeft: "2.75rem",
                  paddingRight: "2.75rem",
                  borderColor: errors.password
                    ? "#ef4444"
                    : ""
                }}
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                style={{
                  position: "absolute",
                  right: "12px",
                  background: "none",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {renderError("password")}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <div className="relative flex items-center">
              <Lock
                className="absolute left-3 text-text-muted"
                size={20}
              />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm your password"
                style={{
                  paddingLeft: "2.75rem",
                  paddingRight: "2.75rem",
                  borderColor: errors.confirmPassword
                    ? "#ef4444"
                    : ""
                }}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                style={{
                  position: "absolute",
                  right: "12px",
                  background: "none",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {renderError("confirmPassword")}
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-2 w-full justify-center py-3 text-lg font-bold"
            style={{
              transition: "all 0.3s ease"
            }}
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-sm text-text-muted text-center">
          <p className="mb-2">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "var(--primary)",
                fontWeight: "bold"
              }}
            >
              Sign In here
            </Link>
          </p>

          <Link
            to="/home"
            style={{ color: "var(--primary)" }}
          >
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  </div>
);
};

export default Register;

