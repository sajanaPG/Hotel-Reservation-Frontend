import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


const UserLogin = ({show, handleClose}) => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    if (!show) return null;

    const handleEmail= (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }

    const handleLogin = async (event) =>{
        event.preventDefault();

        const data = {
            "email" : email,
            "password" : password,
        }

        try {
            const response = await axios.post("http://localhost:9000/auth/login", data);
            setError("");
            setEmail("");
            setPassword("")

            sessionStorage.setItem("token",response.data.token);
            sessionStorage.setItem("email",response.data.email);
            sessionStorage.setItem("id",response.data.id);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            
        } catch (error) {
            setError("Email or Password is wrong ");
            
        }
    }

    return (
        <div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title variant="primary" >User Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder=""
                                autoFocus
                                required
                                value={email}
                                onChange={handleEmail}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder=""
                                autoFocus
                                required
                                value={password}
                                onChange={handlePassword}
                            />
                        </Form.Group>
                        {error &&
                            <div className="text-danger mb-3" >{error}</div>
                        }
                        <div className="d-flex justify-content-between">
                            <Button variant="primary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default UserLogin;