//Auth endpoints
export const IMPERSONATE = (impersonateToken) => `/copilot/auth/impersonate/${impersonateToken}`;
export const LOGIN = '/copilot/auth/login';
export const REGISTER = '/copilot/auth/register';
export const LOGOUT = '/copilot/auth/logout';
export const PASSWORD_RESET = '/copilot/auth/password/reset';
export const VALIDATE_RESET_TOKEN = '/copilot/auth/password/validate-reset-token';
export const UPDATE_PASSWORD = '/copilot/auth/password/update';
export const REFRESH_TOKEN = '/copilot/auth/refresh';

//Open requests
export const GET_OPEN_REQUESTS = '/copilot/open-requests';
export const ACCEPT_REQUEST = '/copilot/open-requests/accept';

// My requests
export const GET_MY_REQUESTS = '/copilot/my-requests';
export const GET_NOTIFICATIONS = `/copilot/my-requests/notifications`;
export const FETCH_REQUEST = (advisorId) => `/copilot/my-requests/chat/${advisorId}/request`;
export const MARK_COMPLETED = (advisorId) => `/copilot/my-requests/chat/${advisorId}/mark-completed`;
export const REFUND_REQUEST = (advisorId) => `/copilot/my-requests/chat/${advisorId}/refund-request`;
export const SEND_MESSAGE = (advisorId) => `/copilot/my-requests/chat/${advisorId}/send-message`;
export const SEND_FILE = (advisorId) => `/copilot/my-requests/chat/${advisorId}/send-file`;
export const LIST_CHATS = (advisorId) => `/copilot/my-requests/chat/${advisorId}`;
export const MARK_SEEN = (advisorId) => `/copilot/my-requests/chat/${advisorId}/mark-seen`;
export const MARK_TASK_COMPLETED = (advisorId) => `/copilot/my-requests/chat/${advisorId}/mark-task-completed`;
export const MARK_TASK_UNCOMPLETED = (advisorId) => `/copilot/my-requests/chat/${advisorId}/mark-task-uncompleted`;



//Global search endpoint
export const GLOBAL_SEARCH = (query) => `/copilot/global-search?query=${query}`;

//Profile endpoints
export const UPDATE_PROFILE_PASSWORD = '/copilot/profile/password/update';
export const UPDATE_PROFILE = '/copilot/profile/update';
export const GET_PROFILE = '/copilot/profile';
export const BILLING_PORTAL = '/copilot/license/billing-portal';
export const CREATE_STRIPE = '/copilot/auth/stripe/create';
export const COMPLETE_STRIPE = '/copilot/auth/stripe/complete-account';
export const GET_STRIPE = '/copilot/auth/stripe/dashboard';

//Subscription
export const GET_SUBSCRIPTION_PRICES = '/copilot/constants/subscription-prices';
export const SUBSCRIBE = '/copilot/license/subscribe-with-card';
export const GENERATE_CARD_TOKEN = '/copilot/payment-methods/generate-token';
export const ADD_PAYMENT_METHOD = '/copilot/payment-methods/add';
export const CHECKOUT = '/copilot/license/checkout';

//Calendar endpoints
export const GET_EVENTS = () => '/copilot/calendar/events?from=2001-01-01&to=2099-12-30';
export const BEGIN_GOOGLE_AUTH = '/copilot/auth/google-calendar/oauth';
export const COMPLETE_GOOGLE_AUTH = '/copilot/auth/google-calendar/oauth/callback'

//Suppliers endpoints
export const FETCH_SUPPLIERS = (start) => `/copilot/suppliers?start=${start}&length=10&paginate=true`;
export const UPDATE_SUPPLIER = (supplierId) => `/copilot/suppliers/${supplierId}/update`;
export const ADD_SUPPLIER = '/copilot/suppliers/add';
export const DELETE_SUPPLIER = (supplierId) => `/copilot/suppliers/${supplierId}/delete`;
export const SUPPLIER_LOOKUP = (search, bookingCategoryId) => `/copilot/suppliers/look-up?search=${search}&booking_category_id=${bookingCategoryId}&detailed=false`;
export const ADD_SUPPLIER_PICTURES = (supplierId) => `/copilot/suppliers/${supplierId}/pictures/add`;
export const NOTES_LOOKUP = (search) => `/copilot/notes/look-up?title=${search}`;
export const GOOGLE_PLACE_HOTEL_SEARCH = (placeId) => `/copilot/suppliers/google-place-hotel-search?place_id=${placeId}&detailed=false`;


//Notes endpoints
export const FETCH_NOTES = (start) => `/copilot/notes?start=${start}&length=10&paginate=true`;
export const AUTOCOMPLETE_NOTES = (search) => `/copilot/notes/auto-complete?title=${search}`;
export const DELETE_NOTE = (noteId) => `/copilot/notes/${noteId}/delete`;
export const ADD_NOTE = '/copilot/notes/add';
export const UPDATE_NOTE = (noteId) => `/copilot/notes/${noteId}/update`;


//Travelers endpoints
export const FETCH_TRAVELERS = `/copilot/travellers`;
export const FETCH_TRAVELER = (id) => `/copilot/travellers/${id}/fetch`;
export const ADD_TRAVELER = `/copilot/travellers/add`;
export const UPDATE_TRAVELER = (id) => `/copilot/travellers/${id}/update`;
export const DELETE_TRAVELER = (id) => `/copilot/travellers/${id}/delete`;

//Itineraries endpoints
export const FETCH_PACKED_ITINERARY = (itineraryId) => `/copilot/itineraries/${itineraryId}/fetch?detailed=true&shared_view=true&packed_booking=true`;
export const FETCH_ITINERARIES = (start, past, active, upcoming) => `/copilot/itineraries?start=${start}&length=10&paginate=true&show_past_itineraries=${past}&show_upcoming_itineraries=${upcoming}&show_active_itineraries=${active}`;
export const FETCH_ITINERARY = (id) => `/copilot/itineraries/${id}/fetch?detailed=true&shared_view=true`;
export const FETCH_SHARED_ITINERARY = (shareCode) => `/shares/itineraries/${shareCode}`;
export const GET_SHARE_CODE = (id) => `/copilot/itineraries/${id}/get-share-code`;
export const GET_ITINERARY_PASSENGERS = (itineraryId) => `/copilot/itineraries/${itineraryId}/passengers`;
export const ADD_ITINERARY_PASSENGER = (itineraryId) => `/copilot/itineraries/${itineraryId}/passengers/add`;
export const DELETE_ITINERARY_PASSENGER = (itineraryId, passengerId) => `/copilot/itineraries/${itineraryId}/passengers/${passengerId}/delete`;
export const DELETE_SHARE_CODE = (id) => `/copilot/itineraries/${id}/delete-share-code`;
export const ADD_ITINERARY = `/copilot/itineraries/add`;
export const UPDATE_ITINERARY = (id) => `/copilot/itineraries/${id}/update`;
export const UPDATE_ITINERARY_PASSENGER = (itineraryId, passengerId) => `/copilot/itineraries/${itineraryId}/passengers/${passengerId}/update`;
export const SET_ITINERARY_STATUS = (id) => `/copilot/itineraries/${id}/set-status`;
export const DELETE_ITINERARY = (id) => `/copilot/itineraries/${id}/delete`;
export const DELETE_ITINERARY_PICTURE = (itineraryId, pictureId) => `/copilot/itineraries/${itineraryId}/pictures/${pictureId}/delete`;
export const GET_ITINERARY_PICTURES = (itineraryId) => `/copilot/itineraries/${itineraryId}/pictures`;
export const ADD_ITINERARY_PICTURES = (id) => `/copilot/itineraries/${id}/pictures/add`;
export const SEND_INVITATION = (id) => `/copilot/itineraries/${id}/send-invitation`;
export const CLONE_ITINERARY = (id) => `/copilot/itineraries/${id}/clone-itinerary`;
export const SEND_INVITATION_TO_CLIENT = (id) => `/copilot/itineraries/${id}/send-invitation-to-client`;
export const UPDATE_ITINERARY_ABSTRACT = (itineraryId) => `/copilot/itineraries/${itineraryId}/update/abstract`;

export const UPDATE_ITINERARY_LOGO = (itineraryId) => `/copilot/itineraries/${itineraryId}/update/logo`;

export const UPDATE_ITINERARY_BOOKING_POSITION = (itineraryId) => `/copilot/itineraries/${itineraryId}/update/booking-date`;

export const ADVISOR_REQUESTS_HIRE = `/copilot/advisor-requests/advisor/hire`;
export const ADVISOR_REQUESTS_PAY_USING_INTENT = (advisorId) => `/copilot/advisor-requests/advisor/${advisorId}/pay-using-intent`;
export const ADVISOR_REQUESTS_COMPLETE_INTENT_PAYMENT = (advisorId) => `/copilot/advisor-requests/advisor/${advisorId}/complete-intent-payment`;

//Bookings
export const ADD_HOTEL_AMENITY = (itineraryId, bookingId) => `/copilot/itineraries/${itineraryId}/bookings/hotels/${bookingId}/amenities/add`;
export const ITINERARY_BOOKINGS = (itineraryId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}`;
export const ITINERARY_BOOKING = (itineraryId, bookingId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/fetch`;
export const ADD_ITINERARY_BOOKING = (itineraryId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/add`;
export const UPDATE_ITINERARY_BOOKING = (itineraryId, bookingId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/update`;
export const ADD_ITINERARY_BOOKING_PASSENGER = (itineraryId, bookingId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/passengers/add`;
export const DELETE_ITINERARY_BOOKING = (itineraryId, otherId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${otherId}/delete`;
export const GET_BOOKING_PASSENGER = (itineraryId, bookingId, passengerId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/passengers/${passengerId}/fetch`;
export const GET_BOOKING_PASSENGERS = (itineraryId, bookingId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/passengers`;
export const GET_ITINERARY_BOOKING_PICTURES = (itineraryId, bookingId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/pictures`;
export const DELETE_ITINERARY_BOOKING_PICTURE = (itineraryId, bookingId, pictureId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/pictures/${pictureId}/delete`;
export const UPDATE_ITINERARY_BOOKING_PASSENGER = (itineraryId, bookingId, passengerId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/passengers/${passengerId}/update`;
export const DELETE_ITINERARY_BOOKING_PASSENGER = (itineraryId, bookingId, passengerId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/passengers/${passengerId}/delete`;
export const GET_HOTEL_AMENITIES = (itineraryId, bookingId) => `/copilot/itineraries/${itineraryId}/bookings/hotels/${bookingId}/amenities`;
export const UPDATE_HOTEL_AMENITY = (itineraryId, bookingId, hotelAmenityId) => `/copilot/itineraries/${itineraryId}/bookings/hotels/${bookingId}/amenities/${hotelAmenityId}/update`;
export const DELETE_HOTEL_AMENITY = (itineraryId, bookingId, hotelAmenityId) => `/copilot/itineraries/${itineraryId}/bookings/hotels/${bookingId}/amenities/${hotelAmenityId}/delete`;
export const GET_BOOKING_SEGMENTS = (itineraryId, bookingId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/segments`;
export const ADD_BOOKING_SEGMENT = (itineraryId, bookingId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/segments/add`;
export const UPDATE_BOOKING_SEGMENT = (itineraryId, bookingId, flightSegmentId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/segments/${flightSegmentId}/update`;
export const DELETE_BOOKING_SEGMENT = (itineraryId, bookingId, flightSegmentId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/segments/${flightSegmentId}/delete`;

export const ADD_ITINERARY_BOOKING_PICTURES = (itineraryId, otherId, bookingCategory) => `/copilot/itineraries/${itineraryId}/bookings/${bookingCategory}/${otherId}/pictures/add`;

//Flights
export const SEARCH_FLIGHT_NUMBER = (itineraryId, flightNumber, departureDate) => `/copilot/itineraries/${itineraryId}/bookings/flights/search-flight-number?flight_number=${flightNumber}&departure_date=${departureDate}`;
export const GET_FLIGHT_SEGMENT_DETAIL = (itineraryId, flightId, flightSegmentId) => `/copilot/itineraries/${itineraryId}/bookings/flights/${flightId}/segments/${flightSegmentId}/fetch`;

//Rooms
export const GET_HOTEL_ROOMS = (itineraryId, bookingId) => `/copilot/itineraries/${itineraryId}/bookings/hotels/${bookingId}/rooms`;
export const ADD_HOTEL_ROOM = (itineraryId, bookingId) => `/copilot/itineraries/${itineraryId}/bookings/hotels/${bookingId}/rooms/add`;
export const UPDATE_HOTEL_ROOM = (itineraryId, bookingId, hotelRoomId) => `/copilot/itineraries/${itineraryId}/bookings/hotels/${bookingId}/rooms/${hotelRoomId}/update`;
export const DELETE_HOTEL_ROOM = (itineraryId, bookingId, hotelRoomId) => `/copilot/itineraries/${itineraryId}/bookings/hotels/${bookingId}/rooms/${hotelRoomId}/delete`;
export const ADD_HOTEL_ROOM_IMAGE = (itineraryId, bookingId, hotelRoomId) => `/copilot/itineraries/${itineraryId}/bookings/hotels/${bookingId}/rooms/${hotelRoomId}/add-image`;
export const DELETE_HOTEL_ROOM_IMAGE = (itineraryId, bookingId, hotelRoomId) => `/copilot/itineraries/${itineraryId}/bookings/hotels/${bookingId}/rooms/${hotelRoomId}/delete-image`;

//Constants
export const GET_CURRENCY_TYPES = '/constants/currency-types';
export const GET_BEDDING_TYPES = '/constants/bedding-types';
export const GET_BOOKING_CATEGORIES = '/constants/booking-category';
export const GET_AIRLINES = '/constants/airlines';
export const GET_AMENITIES = '/constants/amenities';
export const GET_ADVISOR_REQUEST_TYPES = '/constants/advisor-request-type';
export const GET_AVATARS = '/constants/avatars';
export const FETCH_PROPERTY_DESIGNS = `/constants/property-design`;


