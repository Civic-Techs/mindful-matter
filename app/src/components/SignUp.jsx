import React, { useState } from 'react';
import FormInput from './FormInput';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    password: '',
    name: '',
    // bio: ''
    // BIO HIDDEN
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include' // cooooooookieeessss
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const userData = await response.json();
      console.log('Sign Up successful! >', userData);
      // yay or nay
    } catch (err) {
      setError(err.message || 'Sign up failed :[');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-form">
      <h2>Sign up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <FormInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <FormInput
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {/* BIO HIDDEN */}
        {/* <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div> */}
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;