import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddUserModal from "../AddUserModal/AddUserModal";
import EditUserModal from "../EditUserModal/EditUserModal";
import DeleteUserModal from "./../DeleteUserModal/DeleteUserModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";

const API_BASE = "https://jsonplaceholder.typicode.com";
// Maximum 10 users allowed per page
const USERS_PER_PAGE = 10;

// Cleans the phone number to only contain numbers and be 10 digits
const cleanPhone = (phone) => phone.replace(/[^0-9]/g, "").substring(0, 10);

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Get selected user details
    const selectedUser = users.find((user) => user.id === selectedUserId);

    useEffect(() => {
        fetchUsers();
    }, []);

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            const response = await fetch(API_BASE + "/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            toast.error("An error occurred while fetching users");
        } finally {
            setLoading(false);
        }
    };

    // Add a new user
    const addUser = (values) => {
        const promise = fetch(API_BASE + "/users", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        toast.promise(promise, {
            loading: "Adding user...",
            success: (data) => {
                (async () => {
                    data = await data.json();
                    setUsers((prev) => {
                        const updatedUsers = [...prev, data];
                        // Reset pagination after adding the new user
                        const newTotalPages = Math.ceil(updatedUsers.length / USERS_PER_PAGE);
                        setCurrentPage(newTotalPages > currentPage ? currentPage : newTotalPages);
                        return updatedUsers;
                    });
                })();
                return "User added successfully";
            },
            error: "An error occurred while adding user",
        });
    };

    // Update existing user
    const updateUser = (updatedUser) => {
        const promise = fetch(`${API_BASE}/users/${updatedUser.id}`, {
            method: "PUT",
            body: JSON.stringify(updatedUser),
            headers: {
                "Content-Type": "application/json",
            },
        });

        toast.promise(promise, {
            loading: "Updating user...",
            success: (response) => {
                (async () => {
                    const data = await response.json();
                    setUsers(users.map((user) => (user.id === data.id ? data : user)));
                })();
                return "User updated successfully";
            },
            error: "An error occurred while updating the user",
        });
    };

    // Delete user from list
    const deleteUser = () => {
        const deletedUserId = selectedUserId;
        const promise = fetch(`${API_BASE}/users/${deletedUserId}`, {
            method: "DELETE",
        });

        toast.promise(promise, {
            loading: "Deleting user...",
            success: (data) => {
                setUsers(users.filter((user) => user.id !== deletedUserId));
                return "User deleted successfully";
            },
            error: "An error occurred while deleting user",
        });
    };

    // Calculate pagination indices
    const indexOfLastUser = currentPage * USERS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

    return (
        <div className="container">
            {loading && <p>Loading users...</p>}
            {!loading && (
                <div className="row g-4">
                    <div className="col col-md-2">
                        <button
                            type="button"
                            className="btn btn-primary ms-auto d-md-block"
                            data-bs-toggle="modal"
                            data-bs-target="#addUserModal"
                        >
                            Add User
                        </button>
                    </div>
                    {/* Users List */}
                    <div className="col col-md-10">
                        <h2>Users List</h2>
                        {users.length == 0 && <p>No users available</p>}
                        <table className="table table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Website</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => {
                                    return (
                                        <tr
                                            key={
                                                "email=" +
                                                user.email +
                                                "_id=" +
                                                user.id
                                            }
                                        >
                                            <td scope="row">{user.name}</td>
                                            <td>{user.username}</td>
                                            <td>
                                                <a
                                                    className="text-reset"
                                                    href={`mailto:${user.email}`}
                                                    target="_blank"
                                                >
                                                    {user.email}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    className="text-reset"
                                                    href={`tel:${cleanPhone(
                                                        user.phone
                                                    )}`}
                                                    target="_blank"
                                                >
                                                    {cleanPhone(user.phone)}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    className="text-reset"
                                                    href={
                                                        user.website.startsWith(
                                                            "http"
                                                        )
                                                            ? user.website
                                                            : `http://${user.website}`
                                                    }
                                                    target="_blank"
                                                >
                                                    {user.website}
                                                </a>
                                            </td>
                                            <td className="d-flex justify-content-around align-items-center">
                                                <a
                                                    type="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#confirmDeleteModal"
                                                    onClick={() =>
                                                        setSelectedUserId(
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    <RiDeleteBin5Line size={22} color="red" />
                                                </a>
                                                <a
                                                    type="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#editUserModal"
                                                    onClick={() => setSelectedUserId(user.id)}
                                                    // Disable the edit button for newly added users (id > 10)
                                                    className={user.id > 10 ? "disabled" : ""}
                                                    style={user.id > 10 ? { pointerEvents: "none", opacity: 0.5 } : {}}
                                                >
                                                    <FaUserEdit size={22} />
                                                </a>

                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* Pagination controls */}
                        {users.length > USERS_PER_PAGE && (
                            <nav aria-label="User pagination">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            )}

            {/* User Modals */}
            <AddUserModal addUser={addUser} />

            <EditUserModal selectedUser={selectedUser} updateUser={updateUser} />

            <DeleteUserModal
                deleteUser={deleteUser}
                selectedUser={selectedUser}
            />
        </div>
    );
};

export default UserManagement;
