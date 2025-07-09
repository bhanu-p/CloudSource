import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
    const [identifier, setIdentifier] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const lengthCheck = password.length >= 8;
        const uppercaseCheck = /[A-Z]/.test(password);
        const lowercaseCheck = /[a-z]/.test(password);
        const numberCheck = /\d/.test(password);
        return lengthCheck && uppercaseCheck && lowercaseCheck && numberCheck;
    };

    const handleReset = (e) => {
        e.preventDefault();

        if (!identifier || !newPassword || !confirmPassword) {
            toast.error("Please fill all details.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (!validatePassword(newPassword)) {
            toast.error(
                "Password must be at least 8 characters, include uppercase, lowercase, and a number."
            );
            return;
        }

        const usersString = localStorage.getItem("appUsers");
        const users = usersString ? JSON.parse(usersString) : [];

        const userIndex = users.findIndex(
            (user) => user.phone === identifier
        );

        if (userIndex === -1) {
            toast.error("User not found.");
            return;
        }

        users[userIndex].password = newPassword;
        localStorage.setItem("appUsers", JSON.stringify(users));

        toast.success("Reset Password successful!");
    };

    return (
        <div className="resetPassword-container">
            <form className="resetPassword-form" onSubmit={handleReset}>
                <h2 className="resetPassword-title">Reset Password</h2>
                <label className="register-login-label">Mobile Number</label>
                <input
                    className="resetPassword-input"
                    type="text"
                    placeholder="Username or Phone Number"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                />
                <label className="register-login-label">New Password</label>
                <input
                    className="resetPassword-input"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <label className="register-login-label">Confirm New Password</label>
                <input
                    className="resetPassword-input"
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit" className="resetPassword-button">Reset Password</button><br />

                <div className="resetPassword-redirect">
                    <p>
                        <button type="button" onClick={() => navigate("/")}>
                            &lt;  Back to Login
                        </button>
                    </p>
                </div>
            </form>
            <ToastContainer position="top-center"/>
        </div>

    );
};

export default ResetPassword;
