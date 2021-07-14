import { observer } from "mobx-react";
import { useManagers } from "../util/ManagerProvider";
import Loading from "./loading";
import Game from "./game";

const Scene = () => {
    const {sceneManager} = useManagers();
    const {scene, setScene} = sceneManager;

    switch (scene) {
        case 'LOADING': return <Loading setScene={setScene}/>
        case 'GAME': return <Game/>
        default: return <></>
    }

};

export default observer(Scene);