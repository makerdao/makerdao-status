import React from "react";
import styled from "styled-components";
import tempImage from "../../assets/imgs/graphicToDo.png";
import { useMainContext } from "../../context/MainContext";
import { Flex } from "../styledComponents";

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

export default function MainDAICard() {
  const { state } = useMainContext();
  if (!state || !state.vatLine) return null;

  const sectionsTitle = [
    {
      title: "Ceiling",
      subTitle: "Vat_Line",
      value: state.vatLine,
    },
    {
      title: "Base stability fee",
      subTitle: "Jug_Base",
      value: state.jugBase,
    },
    {
      title: "Save Rate",
      subTitle: "Pot_dsr",
      value: state.potDsr,
    },
  ];
  return (
    <Card>
      <Flex>
        {sectionsTitle.map((item, i) => (
          <Flex className="sectionContainer" key={i}>
            <div className="sectionValue">{item.value}</div>
            <div className="titleGroup">
              <div className="sectionTitle">{item.title}</div>
              <div className="sectionSubTitle">{item.subTitle}</div>
            </div>
          </Flex>
        ))}
      </Flex>
      <Flex justifyCenter>
        <img alt="temp" src={tempImage} />
      </Flex>
      <Flex justifyCenter>
        <Flex className="legend">
          <Flex column alignCenter>
            <div className="circle gray"></div>
            <div>Debt ceiling</div>
          </Flex>

          <Flex column alignCenter>
            <div className="circle dark"></div>
            <div>Total DAI</div>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
