import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './UsersPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter(user =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  const fetchUsers = async (page) => {
    try {
      const response = await api.get(`/users?page=${page}`);
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleEdit = (id) => navigate(`/edit/${id}`);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      alert('User deleted successfully');
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  return (
    <div className="users-container">
      <h2>Users List</h2>

      {/* Search Input */}
      <input
        type="text"
        className="search-input"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="users-list">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <p>{user.first_name} {user.last_name}</p>
            <div className="actions">
              <button 
                className="edit-btn" 
                onClick={() => handleEdit(user.id)}>
                Edit
              </button>
              <button 
                className="delete-btn" 
                onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UsersPage;
