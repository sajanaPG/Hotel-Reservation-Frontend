
const Success = ({bookingData }) => {
    return (
        <>
            <h1>Checkout Page</h1>
            <div>
                {console.log(bookingData)} 
                Room Name: {bookingData.room.name} <br/>
                Type: {bookingData.type} <br/>
                Check-in Date: {bookingData.checkin}<br/>
                Check-out Date: {bookingData.checkout}
            </div>

        </>
    )
}

export default Success