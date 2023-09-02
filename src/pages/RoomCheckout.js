import { useState } from "react";
import { Button, Carousel, Col, Form, Image, Row } from "react-bootstrap";
import UserSignup from "../componenets/UserSignup";


const RoomCheckout = () => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    return (
        <div>
            <h1 className="room-main-header">Room Reservation</h1>

            <Row>
                <Col lg={5}>
                    <Row>
                        <h5 className="room-sub-header">Deluxe Suit Room</h5>
                        <hr className="hr-line mb-4" />
                        <Carousel className="mb-4">
                            <Carousel.Item interval={1500}>
                                <Image
                                    src='https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                    fluid
                                />
                                <Carousel.Caption>
                                    <h5>Your Luxury, Our Responsibility</h5>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={1500}>
                                <Image
                                    src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                    fluid
                                />
                                <Carousel.Caption>
                                    <h5>Your Luxury, Our Responsibility</h5>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={1500}>
                                <Image
                                    src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"
                                    fluid
                                />
                                <Carousel.Caption>
                                    <h5>Your Luxury, Our Responsibility</h5>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Row>
                    <Row>
                        <h5 className="room-sub-header mb-10">Room Details</h5>

                        <p className="room-details">
                            Views of Colombo, Executive Lounge access, high floor, corner suite, 61 sq m/656 sq ft, sofa Spoil yourself in this
                            stylish corner suite, featuring 1 king bed and a seating area with sofa. Work away at the desk and browse online with WiFi or unwind with a
                            movie on the TV. Special touches include a bathrobe, slippers and daily newspaper.
                        </p>
                    </Row>

                </Col>
                <Col lg={2}>
                </Col>
                <Col lg={5}>
                    <Form>
                        <h5 className="room-sub-header">Booking Summary</h5>
                        <hr className="hr-line mb-3" />
                        <p>Room Type </p>
                        <p>Chek in</p>
                        <p>Chek out</p>
                        <p>Guests</p>
                        <Row>
                            <Col lg={8}>
                                <hr className="hr-line mb-3 mt-0" />
                                <p>Room Total </p>
                                <p>Discount</p>
                                <p>Taxes</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={8}>
                                <hr className="hr-line mb-3 mt-0" />
                                <h5 className="total-amount mb-4">Total</h5>
                            </Col>
                        </Row>
                        <h5 className="room-sub-header">Payment Method</h5>
                        <hr className="hr-line mb-3" />
                        <div className="mb-3">
                            <Form.Check
                                inline
                                label="Pay now"
                                name="group1"
                                type="radio"
                            />
                            <Form.Check
                                inline
                                label="Pay at the hotel"
                                name="group1"
                                type="radio"

                            />
                        </div>
                        <Form.Check className="mb-3" label="I acknowledge and accept the Terms of all Policy." />
                        <Button variant="primary" onClick={handleShow}>
                            Confim my booking
                        </Button>
                        {/* <Button variant="primary" onClick={handleShow}>
                                    Login
                                </Button> */}

                        <UserSignup show={show} handleClose={handleClose} />
                        {/* <UserLogin  show={show} handleClose={handleClose} /> */}
                    </Form>
                </Col>

            </Row>

        </div >
    );

}

export default RoomCheckout;
