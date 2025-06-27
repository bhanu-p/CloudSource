import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [identifier, setIdentifier] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
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
            setError("Please fill all details.");
            return;
        }


        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!validatePassword(newPassword)) {
            setError(
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
            setError("User not found.");
            return;
        }

        users[userIndex].password = newPassword;
        localStorage.setItem("appUsers", JSON.stringify(users));

        setSuccess("Reset Password successful!");
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

                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-text">{success}</p>}

                <button type="submit" className="resetPassword-button">Reset Password</button><br />

                <div className="resetPassword-redirect">
                    <p>
                        <button type="button" onClick={() => navigate("/")}>
                            &lt;  Back to Login
                        </button>
                    </p>
                </div>
            </form>
        </div>

    );
};

export default ResetPassword;
