/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-spaced-func */
import { createContext, useCallback, useContext, useState } from 'react';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import {
  localStorageRead,
  localStorageWrite,
  StorageKeys,
} from '../services/utils/localStorage/localStorage';

const SideBarContext = createContext<
  { expanded: boolean; toggleSideBar: () => void } | undefined
>(undefined);

function SideBarProvider({ ...props }) {
  const isDownXs = useBreakpoint(down('xs'));
  const [expanded, setExpanded] = useState(
    localStorageRead(StorageKeys.EXPANDED_SIDEBAR) === 'true',
  );

  const toggleSideBar = useCallback(() => {
    if (isDownXs) return;
    const newValue = !expanded;

    localStorageWrite(StorageKeys.EXPANDED_SIDEBAR, newValue.toString());

    setExpanded(newValue);
  }, [expanded, isDownXs]);

  return (
    <SideBarContext.Provider value={{ expanded, toggleSideBar }} {...props} />
  );
}

function useSideBarContext() {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error('useSideBarContext must be used within a SideBarProvider');
  }

  const { expanded } = context;
  const { toggleSideBar } = context;
  return { expanded, toggleSideBar };
}

export { SideBarProvider, useSideBarContext };
