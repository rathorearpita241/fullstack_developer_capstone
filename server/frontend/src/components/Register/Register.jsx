
import React, { useState } from "react";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Registration successful!");
                setFormData({
                    username: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: ""
                });
            } else {
                setMessage(data.error || "Registration failed.");
            }
        } catch (error) {
            setMessage("Unable to connect to the server.");
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.heading}>Create an Account</h1>
                <p style={styles.subtitle}>
                    Sign up for Cars Dealership
                </p>

                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <label>First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="Enter first name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />

                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Enter last name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" style={styles.button}>
                        Register
                    </button>
                </form>

                {message && (
                    <p role="status" style={styles.message}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f4f8",
        padding: "20px"
    },
    card: {
        background: "white",
        width: "100%",
        maxWidth: "450px",
        padding: "35px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
    },
    heading: {
        textAlign: "center",
        color: "#172337"
    },
    subtitle: {
        textAlign: "center",
        color: "#666",
        marginBottom: "25px"
    },
    button: {
        width: "100%",
        padding: "13px",
        background: "#172337",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        marginTop: "20px",
        fontSize: "16px"
    },
    message: {
        textAlign: "center",
        marginTop: "15px"
    }
};

export default Register;
