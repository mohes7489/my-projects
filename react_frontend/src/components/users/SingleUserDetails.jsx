import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserDetails, selectUserDetails, selectUserLoading, selectUserError } from './SingleUserSlice';
import { dataTestIds } from "../../tests/constants/components";
import { deleteUser, modifyUserRole } from "./usersSlice";

const SingleUserDetails = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(selectUserDetails);
    const loading = useSelector(selectUserLoading);
    const error = useSelector(selectUserError);
    const navigate = useNavigate();
    console.log(user)
  
    useEffect(() => {
      dispatch(fetchUserDetails(userId));
    }, [dispatch, userId]);

    const handleDeleteUser = (id) => {
      dispatch(deleteUser(id));
      navigate(-1);
    }

    const handleModifyUserRole = (userId, userRole) => {
      // dispatch(modifyUserRole({ userId, role: userRole }));
      navigate(`/users/${userId}/modify`);
    };
  
  
    return (
      <div data-testid="notifications-container">
        {loading ? (
          <p data-testid="user-loading-notification">Loading...</p>
        ) : error ? (
          <p data-testid="user-error-notification">Error: {error.message}</p>
        ) : user ? (
          <div data-testid="user-success-notification">
            <div data-testid="inspect-container">
              <div data-testid={dataTestIds.containerId.listItem(user.id)}>
                <h2 data-testid="id-value">user ID: {user.id}</h2>
                <h3 data-testid="name-value">user name: {user.name}</h3>
                <p data-testid="email-value">user email {user.email}</p>
                <p data-testid="role-value">user role: {user.role}</p>
                <button data-testid="delete" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                <button data-testid="modify" onClick={() => handleModifyUserRole(user.id, user.role=== "admin" ? "customer" : "admin")}>Change Role</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };
  
  export default SingleUserDetails;