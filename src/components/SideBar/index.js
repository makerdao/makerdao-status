import React from "react";
import styled from "styled-components";
import { routes } from "../../utils/constants/routes";
import {useHistory} from 'react-router-dom'
const SidebarContainer = styled.div`
  width: 200px;
  background: #bfc1c7;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 2rem 0.5rem;
  box-sizing: border-box;

  .sidebarLink {
    margin: 2rem 0;
    border-radius: 10px;
    font-weight: 600;
    text-align: center;
    padding: 0.5rem;
    cursor: pointer;

    &:hover {
      background: #e0e0e0;
    }
    &.activeLink{
        background: #e0e0e0;
      box-shadow: 0 0 10px 2px #989898;
    }
  }
`;

export default function SideBar() {
const {push}=useHistory()
  return (
    <SidebarContainer>
      {routes.map((item, i) => (
        <div className="sidebarLink" key={i} onClick={()=>{push(item.path)}}>
          {item.label}
        </div>
      ))}
    </SidebarContainer>
  );
}
