import React from "react";
import Card from "./Card";

const SearchList = ({bookings}) => {
    return (
        <React.Fragment>
            {bookings && bookings.map((booking) => {
                return <Card key={booking.id}
                    id={booking?.id}
                    title={booking?.title}
                    client={booking?.client}
                    start={booking?.start}
                    end={booking?.end}
                    status={booking?.status}
                    />
            })}
        </React.Fragment>
    );
}

export default SearchList;