import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams hook
import { modifyUserRole } from "./usersSlice";

const ModifyUserRole = () => {
    const dispatch = useDispatch();
    const { userId } = useParams(); // Get userId from URL params
    const users = useSelector(state => state.users.items);
    const status = useSelector(state => state.users.status);
    const [user, setUser] = useState(null); // State to store the specific user data
    const [selectedRole, setSelectedRole] = useState('customer');
    const navigate = useNavigate();


    // Find the user data based on userId when users or userId change
    useEffect(() => {
        if (users && userId) {
            const foundUser = users.find(user => user.id === userId);
            setUser(foundUser);
            setSelectedRole(foundUser ? foundUser.role : '');
        }
    }, [users, userId]);

    const handleModifyUserRole = async (userId, newRole) => {
      dispatch(modifyUserRole({ userId, role: newRole }));
      navigate('/users');
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous route
  };

    // Render loading state while fetching data
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    // Render form once user data is available
    return (
      <div data-testid="notifications-container">
      <div data-testid="form-container">
          <label>name: </label>
          <input data-testid="name-value" type="text" value={user ? user.name : ''} readOnly/>
          <select data-testid="role-select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="customer">customer</option>
              <option value="admin">admin</option>
          </select>
          <button data-testid="submit" disabled={user && user.role === selectedRole} onClick={() => handleModifyUserRole(user.id, selectedRole)}>submit</button>
          <button data-testid="cancel" onClick={handleCancel}>cancel</button>
      </div>
  </div>
    );
}

export default ModifyUserRole;

/* import { dataTestIds } from "../../tests/constants/components";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { modifyUserRole } from "./usersSlice";

const UserModifier = () => {
  const { userId } = useParams();
  const user = useSelector(state => state.users.find(user => user.id === userId));
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name,
    role: user.role,
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      role: user.role,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(modifyUserRole(userId, formData));
    navigate(-1); 
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <div data-testid="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <span data-testid={dataTestIds.nameValue}>{formData.name}</span>
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            data-testid={dataTestIds.roleSelect}
          >
            <option value="customer">customer</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div>
          <button type="submit" disabled={formData.role === user.role} data-testid={dataTestIds.submit}>Submit</button>
          <button type="button" onClick={handleCancel} data-testid={dataTestIds.cancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UserModifier; */


{/* <div data-testid="notifications-container">
{status === "pending" ? (
    <p data-testid="user-loading-notification">Loading...</p>
) : status === "success" ? (
    <div data-testid="user-success-notification">
        <div data-testid={dataTestIds.containerId.main} className="orders">
            <table className="table">
                <thead className="thead">
                    <tr>
                        <th>NO.</th>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ROLE</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user.id} data-testid={dataTestIds.containerId.listItem(user.id)} className="singleOrder">
                            <td className="tdNumber">{number++}</td>
                            <td data-testid="id-value" className="tds">{user.id}</td>
                            <td data-testid="name-value" className="tds">{user.name}</td>
                            <td data-testid="email-value" className="tds">{user.email}</td>
                            <td data-testid="role-value" className="tds">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
) : (
    <p>An error occurred</p>
)}
</div> */}