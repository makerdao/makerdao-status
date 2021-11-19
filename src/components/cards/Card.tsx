import styled from 'styled-components';

interface Props {
  full?: boolean;
}

const Card = styled.div`
  background: #fffefe;
  box-shadow: 0px 4px 9.03012px rgba(176, 190, 197, 0.25);
  border-radius: 10px;
  ${({ full }: Props) => (full ? 'width: 100%' : '')}
`;

export default Card;
