import styled from "styled-components";

const Card = styled.div`
  margin: 1rem;
  padding: 1rem;
  width: fit-content;
  box-shadow: 0px 0px 10px 10px rgb(45 44 233 / 10%);
  border-radius: 0.25rem;

  .sectionContainer {
    .sectionValue {
      font-size: 1.3rem;
      color: #616161;
    }
    .titleGroup {
      margin-left: 0.3rem;
      margin-right: 0.5rem;
    }
    .sectionTitle {
      font-size: 0.8rem;
      color: #616161;
    }
    .sectionSubTitle {
      font-size: 0.6rem;
      color: gray;
    }
  }

  .legend {
    width: 30%;
    white-space: nowrap;
    color: gray;
    font-size: 0.8rem;
    .circle {
      width: 30px;
      height: 30px;
      border-radius: 30px;
      margin: 0.2rem 1rem;

      &.gray {
        background-color: #bfc1c7;
      }

      &.dark {
        background-color: #4c5365;
      }
    }
  }
`;

export default Card;
