import { dataTestIds } from "../../tests/constants/components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersFetch, deleteUser, modifyUserRole } from "./usersSlice";
import { Link, useNavigate } from 'react-router-dom';

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.items);
    const status = useSelector(state => state.users.status);
    const loggedInUser = useSelector(state => state.auth.id);
    const navigate = useNavigate();
    console.log("the users are:", loggedInUser);
    let number = 1;

    useEffect(() => {
        dispatch(usersFetch());
    }, [dispatch]);

    const handleSingleUser = (id)=> {return (
        <Link to={`/users/${id}`} >
          {id}
        </Link>
      );
    }
    const handleModifyUserRole = (userId) => {
        navigate(`/users/${userId}/modify`);
    };

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
    }

    return (
        <div data-testid="notifications-container">
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
                                        <td className="tds">
                                            <span data-testid={dataTestIds.linkId.inspect(user.id)}>{handleSingleUser(user.id)}</span>
                                            { user.id !== loggedInUser && (
                                                <>
                                                    <button data-testid="delete" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                                    <button data-testid="modify" onClick={() => handleModifyUserRole(user.id)}>Change Role</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>An error occurred</p>
            )}
        </div>
    );
}

export default Users;