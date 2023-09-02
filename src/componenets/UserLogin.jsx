import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UserLogin = (show, handleClose) => {
    return (
        <div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title color="primary" >User Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Username</Form.Label>
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
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserLogin;