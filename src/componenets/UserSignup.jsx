import axios from "axios";
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const UserSignup = ({ show, handleClose }) => {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const [registerEnabled, setRegisterEnabled] = useState("false");
    if (!show) return null;

    const handleFirstname = (event) => {
        setfirstname(event.target.value);
    }

    const handleLastname = (event) => {
        setlastname(event.target.value);
    }

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);

        if (password.length <= 6) {
            setRegisterEnabled(false);
        }
        else {
            setRegisterEnabled(true);
        }

    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (email !== null && regex.test(email)) {
            setRegisterEnabled(true);
        } else {
            setRegisterEnabled(false);
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault();

        const data = {
            'firstName': firstname,
            'lastName': lastname,
            'password': password,
            'email': email,
            'phone': phoneNumber,
            'role': "ROLE_USER",

        }

        try {
            const response = await axios.post("http://localhost:9000/auth/register", data);
            setError("");
            setEmail("");
            setfirstname("");
            setlastname("");
            setPhoneNumber("");


        } catch (error) {
            setError(error.response.data.message);
        }
    }


    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title variant="primary" >User Signup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleRegister}>
                        <Row>
                            <Col lg={6}>
                                <Form.Group className="mb-3" controlId="firstname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        autoFocus
                                        required
                                        value={firstname}
                                        onChange={handleFirstname}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="mb-3" controlId="lastname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        autoFocus
                                        required
                                        value={lastname}
                                        onChange={handleLastname}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="phoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder=""
                                autoFocus
                                required
                                value={phoneNumber}
                                onChange={handlePhoneNumber}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder=""
                                autoFocus
                                required
                                value={email}
                                onChange={handleEmail}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="NICNo">
                            <Form.Label>NIC No/Passport No</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                autoFocus
                                required
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
                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirm your Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder=""
                                autoFocus
                                required
                            />
                        </Form.Group>
                        {error &&
                            <div className="text-danger mb-3" >{error}</div>
                        }
                        <div className="d-flex justify-content-between">
                            <Button variant="primary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" disabled={!registerEnabled}>
                                Sign up
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>

    );
}

export default UserSignup;