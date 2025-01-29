import { useEffect, useState } from "react";

const API_BASE = "https://jsonplaceholder.typicode.com";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container">
            {loading && <p>Loading users...</p>}
            {!loading && (
                <div className="row g-4">
                    {/* Left column */}
                    {/* <div className="col col-md-2">
                        <button
                            type="button"
                            className="btn btn-primary ms-auto d-md-block"
                            data-bs-toggle="modal"
                            data-bs-target="#addUserModal"
                        >
                            Add User
                        </button>
                    </div> */}
                    {/* Right Column */}
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
                                {users.map((user) => {
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
                                                    // href={`tel:${cleanPhone(
                                                    //     user.phone
                                                    // )}`}
                                                    target="_blank"
                                                >
                                                    {/* {cleanPhone(user.phone)} */}
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
                                            <td>
                                                {/* <a
                                                    type="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#confirmDeleteModal"
                                                    onClick={() =>
                                                        setSelectedUserId(
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        style={{
                                                            width: "24px",
                                                            height: "24px",
                                                        }}
                                                        className="text-danger"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </a> */}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserManagement
