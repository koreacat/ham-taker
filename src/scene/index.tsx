import { observer } from "mobx-react";
import { useState } from "react";
import Game from "./game";
import Loading from "./loading";

export type Scene = 'LOADING' | 'GAME';

const Scene = () => {
    const [scene, setScene] = useState<Scene>('LOADING');

    switch(scene) {
        case 'LOADING': return <Loading setScene={setScene}/>;
        case 'GAME': return <Game/>; 
    }
}

export default observer(Scene);