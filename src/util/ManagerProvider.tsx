import React from "react";
import { Managers } from "../managers";

const ManagerContext = React.createContext(null);

export const ManagerProvider: React.FC<{value: any}> = function(props) {
    return <ManagerContext.Provider value={props.value}>{props.children}</ManagerContext.Provider>;
};

export function useManagers() {
    return React.useContext(ManagerContext) as unknown as Managers;
}