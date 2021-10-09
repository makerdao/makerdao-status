import { createContext, useCallback, useContext, useState } from "react";
import { localStorageRead,localStorageWrite, StorageKeys} from "../services/utils/localStorage/localStorage";

const SideBarContext = createContext<{expanded:boolean,toggleSideBar:any} | undefined>(undefined);

function SideBarProvider({ ...props }) {

  const [expanded, setExpanded] = useState(
    localStorageRead(StorageKeys.EXPANDED_SIDEBAR) === "true"
  );

  const toggleSideBar = useCallback(() => {
    const newValue = !expanded;

    localStorageWrite(StorageKeys.EXPANDED_SIDEBAR, newValue.toString());

    setExpanded(newValue);
  }, [expanded]);

  return <SideBarContext.Provider value={{expanded,toggleSideBar}} {...props} />;
}

function useSideBarContext() {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error(
      "useSideBarContext must be used within a SideBarProvider"
    );
  }

  const expanded = context.expanded;
  const toggleSideBar=context.toggleSideBar
  return { expanded,toggleSideBar };
}

export { SideBarProvider, useSideBarContext };
