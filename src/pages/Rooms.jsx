import { Container, Row, Col, Form, FloatingLabel, Button, Card, ListGroup } from "react-bootstrap";
import DateRangeComp from "../components/DateRangeComp";
import { useEffect, useState } from "react";
import { getRequest } from "../services/ApiService";
import Carousel from 'react-bootstrap/Carousel';
import format from 'date-fns/format';
import { addDays } from 'date-fns';
import { useNavigate } from "react-router-dom";

const Rooms = ({setBookingData}) => {
    
    const [rooms, setRooms] = useState([]);
    const [images, setImages] = useState([]);
    const [existingReservations, setExistingReservations] = useState("");
    const [filteredRooms, setFilteredRooms] = useState([]);

    const [selectedDateRange, setSelectedDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 2),
            key: 'selection'
        }
    ]);
    const [category, setCategory] = useState("All")
    const [guests, setGuests] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getAllRooms = async () => {
            const response = await getRequest("/rooms");
            setRooms(response.data);
            setFilteredRooms(response.data);
        }

        getAllRooms();

        const fetchReservations = async () => {

            const response = await getRequest("/reservations/Pending");
            setExistingReservations(response.data);
        }

        fetchReservations();
    }, [setRooms])

    const fetchImagesForRoom = async (roomId) => {
        const response = await getRequest(`/rooms/${roomId}/images`);
        return response.data;
    }

    useEffect(() => {
        // Fetch images for each room
        const fetchImages = async () => {
            const imagesPromises = rooms.map(room => fetchImagesForRoom(room.id));
            Promise.all(imagesPromises)
                .then(imagesList => setImages(imagesList))
                .catch(error => console.error(error));
        }
        fetchImages();
    }, [rooms]);

    const updateSelectedDateRange = (range) => {
        setSelectedDateRange(range);
    };

    const isDateAvailable = (roomId, givenCheckInDate, givenCheckOutDate) => {
        for (const existingReservation of existingReservations) {
            if (existingReservation.room.id === roomId) {
                // Convert dates to timestamps
                const givenCheckInTimestamp = new Date(givenCheckInDate).getTime();
                const givenCheckOutTimestamp = new Date(givenCheckOutDate).getTime();
                const existingCheckInTimestamp = new Date(existingReservation.checkIn).getTime();
                const existingCheckOutTimestamp = new Date(existingReservation.checkOut).getTime();

                // Check for overlapping timestamps
                if (
                    (givenCheckInTimestamp > existingCheckInTimestamp && givenCheckInTimestamp < existingCheckOutTimestamp) ||
                    (givenCheckOutTimestamp > existingCheckInTimestamp && givenCheckOutTimestamp < existingCheckOutTimestamp) ||
                    (givenCheckInTimestamp === existingCheckInTimestamp || givenCheckOutTimestamp === existingCheckOutTimestamp) ||
                    (givenCheckInTimestamp < existingCheckInTimestamp && givenCheckOutTimestamp > existingCheckOutTimestamp)
                ) {
                    // Overlapping dates, the room is not available
                    return false;
                }
            }
        }
        // No overlapping dates found, the room is available
        return true;
    };

    const handleFilter = async () => {
        //convert to int
        const guestsNumber = parseInt(guests);

        // Filter rooms based on #guests, category, dates and max price
        const filtered = rooms.filter((room) => {
            let occupantsMatch = guests === "" || room.occupants === guestsNumber;
            let priceMatch = maxPrice === "" || room.unitPrice <= maxPrice;
            let categoryMatch = category === "All" || room.type === category;
            let datesAvailable = isDateAvailable(room.id, format(selectedDateRange[0].startDate, "yyyy-MM-dd"), format(selectedDateRange[0].endDate, "yyyy-MM-dd"));
            return occupantsMatch && priceMatch && categoryMatch && datesAvailable;
        });
        // Update the rooms state with filtered rooms
        setFilteredRooms(filtered);
    }

    const handleBooking = async (event, room, images) => {
        event.preventDefault();
        //data to be used in checkout page
        const data = {
            "room": room,
            "images": images,
            "checkin": format(selectedDateRange[0].startDate, "yyyy-MM-dd"),
            "checkout": format(selectedDateRange[0].endDate, "yyyy-MM-dd")
        }
        setBookingData(data);
        navigate('/checkout');
    };

    return (
        <>
            <h1 className="luxury-font text-center">Rooms</h1>

            <Container>
                <Row className="justify-content-md-center mt-5">
                    <Col lg={3} sm>
                        <DateRangeComp updateSelectedDateRange={updateSelectedDateRange} />
                    </Col>
                    <Col sm>
                        <FloatingLabel controlId="roomCategory" label="Room Category">
                            <Form.Select aria-label="Room Category" onChange={(event) => setCategory(event.target.value)}>
                                <option value="All">Select a Category</option>
                                <option value="All">All</option>
                                <option value="Standard">Standard</option>
                                <option value="Premium">Premium</option>
                                <option value="Duluxe">Duluxe</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col sm>
                        <FloatingLabel controlId="floatingInput" label="Number of Guests" >
                            <Form.Control type="number" placeholder="Number of Guests" onChange={(event) => setGuests(event.target.value)} />
                        </FloatingLabel>
                    </Col>
                    <Col sm >
                        <FloatingLabel controlId="floatingInput" label="Maximum Price">
                            <Form.Control type="number" placeholder="Maximum Peice" onChange={(event) => setMaxPrice(event.target.value)} />
                        </FloatingLabel>
                    </Col>
                    <Col lg={1} className="text-centre mt-2 ">
                        <Button onClick={handleFilter}>Search</Button>
                    </Col>
                </Row>

                <Row className="mt-3">
                    {filteredRooms && filteredRooms.map((room, index) => {
                        return (
                            <Col lg='4' md='6' className="mt-4 py-2" key={room.id}>
                                <Card className="mx-auto" style={{ width: '20rem' }} >

                                    <Carousel interval={4500}>
                                        {images[index] && images[index].map((image, imageIndex) => (
                                            <Carousel.Item key={imageIndex}>
                                                <img className="cardImage" src={image.url} alt={`sliderImg-${imageIndex}`} />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>

                                    <Card.Body>
                                        <Card.Title> {room.name} </Card.Title>

                                        {room.type} <br />
                                        Occupants: {room.occupants} <br />
                                        {room.unitPrice} LKR Per Night
                                        <h5>Features</h5>
                                    </Card.Body>

                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>
                                            <Row>
                                                {rooms[index] && rooms[index].features.map((feature, featureIndex) => (
                                                    <Col className="text-center" key={featureIndex}>
                                                        {feature.name}
                                                    </Col>
                                                ))}
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body className="text-center">

                                        {/* handleBooking pass the click event, selected room, room's images */} 
                                        <Button onClick={(event) => handleBooking(event, room, images[index])} >Book Now</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}

                </Row>
            </Container>
        </>
    )
}

export default Rooms;