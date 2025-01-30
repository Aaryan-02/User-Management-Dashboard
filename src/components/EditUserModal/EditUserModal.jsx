import { useEffect, useState } from "react";

const EditUserModal = ({ selectedUser, updateUser }) => {
    const [values, setValues] = useState(selectedUser || {});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setValues(selectedUser || {});
    }, [selectedUser]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        let error = "";

        // Input validation logic
        switch (name) {
            case "name":
                if (!value.trim()) error = "Name is required";
                break;
            case "username":
                if (!value.trim()) error = "Username is required";
                break;
            case "email":
                if (!/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value))
                    error = "Invalid email";
                break;
            case "phone":
                if (!/^\d{10}$/.test(value))
                    error = "Phone must be 10 digits";
                break;
            case "website":
                if (!/^https?:\/\/[\w.-]+\.[a-z]{2,}/.test(value))
                    error = "Invalid URL";
                break;
            default:
                break;
        }

        setErrors({ ...errors, [name]: error });
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).some((err) => err)) return;
        updateUser(values);

        const modalElement = document.getElementById("editUserModal");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();
    };

    return (
        <div id="editUserModal" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit User</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {["name", "username", "email", "phone", "website"].map((field) => (
                                <div key={field} className="mb-3">
                                    <label className="form-label text-capitalize">{field}</label>
                                    <input
                                        type={field === "email" ? "email" : "text"}
                                        className={`form-control ${errors[field] ? "is-invalid" : ""}`}
                                        name={field}
                                        value={values[field] || ""}
                                        onChange={onInputChange}
                                        required
                                    />
                                    {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
