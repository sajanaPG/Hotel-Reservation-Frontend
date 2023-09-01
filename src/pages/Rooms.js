import { Container, Row, Col, Form, FloatingLabel, Button, Card, ListGroup } from "react-bootstrap";
import DateRangeComp from "../components/DateRangeComp";
import { useEffect, useState } from "react";
import { getRequest } from "../services/ApiService";
import Carousel from 'react-bootstrap/Carousel';

const Rooms = () => {

    const [rooms, setRooms] = useState([]);
    const [images, setImages] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);

    const [guests, setGuests] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState("");
    const [maxPrice, setMaxPrice] = useState(null);

    const [reservations, setReservations] = useState("");

    useEffect(() => {
        const getAllRooms = async () => {
            const response = await getRequest("/rooms");
            setRooms(response.data);
            setFilteredRooms(response.data);
        }

        getAllRooms();
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

    const fetchReservations = async () => {
        const response = await getRequest("/reservations/Pending");
        console.log(response.data);
        setReservations(response.data);
    } 

    const handleFilter = async () => {

        // Convert guests and maxPrice to numbers
        const guestsNumber = parseInt(guests);
        const maxPriceNumber = parseInt(maxPrice);
    
        // Filter rooms based on guests and max price
        const filtered = rooms.filter((room) => {
            let occupantsMatch = guests === null || room.occupants >= guests;
            let priceMatch = maxPrice === null || room.unitPrice <= maxPrice;
            return occupantsMatch && priceMatch;
        });
    
        // Update the rooms state with filtered rooms
        setRooms(filteredRooms);
    }
    
    return (
        <>
            <h2 className="text-center">Rooms</h2>

            <Container>
                <Row className="justify-content-md-center mt-5">
                    <Col sm>
                        <DateRangeComp updateSelectedDateRange={updateSelectedDateRange} />
                    </Col>
                    <Col sm>
                        <FloatingLabel controlId="floatingInput" label="Number of Guests" >
                            <Form.Control type="number" placeholder="Number of Guests" onChange={(event) => setGuests(event.target.value)}/>
                        </FloatingLabel>
                    </Col>
                    <Col sm >
                        <FloatingLabel controlId="floatingInput" label="Maximum Price">
                            <Form.Control type="number" placeholder="Maximum Peice" onChange={(event) => setMaxPrice(event.target.value)}/>
                        </FloatingLabel>
                    </Col>
                    <Col lg={1} className="text-centre mt-2 ">
                        <Button onClick={handleFilter}>Search</Button>
                    </Col>
                </Row>

                <div>
                    <div>
                        Selected Date Range: {selectedDateRange && `${selectedDateRange[0].startDate.toDateString()} - ${selectedDateRange[0].endDate.toDateString()}`}
                    </div>
                </div>

                <Row className="mt-3">
                    {rooms && rooms.map((room, index) => {
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
                                        <Button>Book Now</Button>
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