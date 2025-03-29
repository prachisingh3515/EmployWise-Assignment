import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import './EditUserPage.css';

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/users/${id}`);
      setUser(response.data.data);
    } catch (err) {
      setError('Failed to load user details');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.put(`/users/${id}`, user);
      alert('User updated successfully');
      navigate('/users');
    } catch (err) {
      setError('Failed to update user');
    }
  };

  return (
    <div className="edit__container">
      <form onSubmit={handleSubmit} className="edit__form">
        <h2 className="edit__title">Edit User</h2>
        <input
          type="text"
          className="edit__input"
          placeholder="First Name"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          required
        />
        <input
          type="text"
          className="edit__input"
          placeholder="Last Name"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          required
        />
        <input
          type="email"
          className="edit__input"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <button type="submit" className="edit__button">Update</button>
        {error && <p className="edit__error">{error}</p>}
      </form>
    </div>
  );
};

export default EditUserPage;
