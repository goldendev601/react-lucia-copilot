import styled from "styled-components";

export const Space = () => '\u00A0';

export const StyledP = styled.p`
  font-size: 16px;
  margin-bottom: ${props => props.mb};
  text-align: ${props => props.ta};
`

export const StyledB = styled.b`
  font-size: 16px;
  margin-bottom: ${props => props.mb};
`;

export const BookingInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;