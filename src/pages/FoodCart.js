import { Button, Col, Row, Table } from "react-bootstrap";

const FoodCart = () => {
    return (
        <div>
            <Row>
                <Col lg={8}>
                    <h5 className="food-sub-header">Your Basket</h5>
                    <hr className="hr-line mb-4" />
                    <Table striped hover  >
                        <thead>
                            <tr className="text-center" >
                                <th width="100">ID</th>
                                <th width="800">Item</th>
                                <th width="200">Price(Rs.)</th>
                                <th width="100">Quantity</th>
                                <th width="200">Subtotal(Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-end" colSpan={4}>Sub Total</td>
                                <td className="text-end" >Rs 1780.00</td>
                            </tr>
                            <tr>
                                <td className="text-end" colSpan={4}>Discount Amount</td>
                                <td className="text-end" >Rs. 0</td>
                            </tr>
                            <tr>
                                <td className="text-end" colSpan={4}>Service Charge</td>
                                <td className="text-end" >Rs 0</td>
                            </tr>
                            <tr>
                                <td className="text-end" colSpan={4}>Total Amount</td>
                                <td className="text-end" >Rs 1780.00</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="primary" size="sm">Go Back</Button>
                </Col>
                <Col lg={4}>
                    <h5 className="food-sub-header">Order Summary</h5>
                    <hr className="hr-line mb-4" />
                    <form>
                        <div className="d-grid gap-2">
                            <Button variant="outline-primary" size="sm">Enter Your Coupn Code</Button>
                            <Button className="mb-3" variant="outline-primary" size="sm">Reedem GES discount</Button>
                        </div>

                        <Table striped hover>
                            <tbody>
                                <tr>
                                    <td>Sub total</td>
                                </tr>
                                <tr>
                                    <td>Discount Amount</td>
                                </tr>
                                <tr>
                                    <td>Discounted Total</td>
                                </tr>
                                <tr>
                                    <td>Service Charge(7.50%)</td>
                                </tr>
                            </tbody>

                        </Table>
                        <h6 className="text-end" >Net Total</h6>
                        <h5 className="text-end">Rs 1,780.00</h5>
                        <div className="d-grid gap-2">
                            <Button variant="primary" >Continue</Button>
                        </div>

                    </form>
                </Col>
            </Row>
        </div>
    )
}

export default FoodCart;