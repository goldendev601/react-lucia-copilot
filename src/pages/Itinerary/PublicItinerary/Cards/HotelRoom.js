import React from "react";
import {Space, StyledB, StyledP} from "./CardComponents/StyledComponents";
import getSymbolFromCurrency from "currency-symbol-map";
import {Border} from "../../ItineraryDetails/BookingDetailCards/BookingDetailCardComponents/BorderTop";
import {RoomInfo} from "./HotelCard";
import styled from "styled-components";

const HotelRoomInformation = styled.div`
`;

const HotelRooms = ({rooms, borderTop, borderBottom}) => {
    return (
        <HotelRoomInformation>
            {rooms.length > 0 && rooms.map((room, index) => {
                    const currencySymbol = getSymbolFromCurrency(room?.currencyType);

                    return (
                        <div style={{marginBottom: borderTop ? '40px' : '0'}} key={index}>
                            {borderTop && <Border mw="100%"/>}
                            {room?.guestName &&
                            <RoomInfo>
                                <StyledB>Guest Name:<Space/></StyledB><StyledP>{room?.guestName || 'Not provided'}</StyledP>
                            </RoomInfo>}
                            <RoomInfo style={{display: 'flex', flexWrap: 'wrap'}}>
                                <StyledB>Room Type:<Space/></StyledB><StyledP>{room?.roomType}</StyledP><Space/><Space/><Space/>
                                {room?.roomRate !== 0 &&
                                <React.Fragment>
                                    <StyledB>Room Rate:<Space/></StyledB><StyledP>{currencySymbol === 'L' ? '' : currencySymbol}{room?.roomRate || 'Not provided'}</StyledP><Space/><Space/><Space/>
                                </React.Fragment>}
                                <StyledB>Currency:<Space/></StyledB><StyledP>{room?.currencyType || 'Not provided'}</StyledP>
                            </RoomInfo>
                            {room.numberOfGuests !== 0 &&
                            <RoomInfo>
                                <StyledB>Number of
                                    guests:<Space/></StyledB><StyledP>{room?.numberOfGuests || 'Not provided'}</StyledP>
                            </RoomInfo>}
                            <RoomInfo>
                                <StyledB>Bedding type:<Space/></StyledB><StyledP>{room?.beddingType || 'Not provided'}</StyledP>
                            </RoomInfo>
                            {room.roomDescription &&
                            <React.Fragment>
                                <RoomInfo>
                                    <StyledB>Room description:<Space/></StyledB><br/>
                                </RoomInfo>
                                <RoomInfo>
                                    <StyledP ta='left'>{room?.roomDescription || 'Not provided'}</StyledP>
                                </RoomInfo>
                            </React.Fragment>}
                            {borderBottom && <Border mw="640px"/>}
                        </div>
                    );
                }
            )}
        </HotelRoomInformation>
    );
}

export default HotelRooms;