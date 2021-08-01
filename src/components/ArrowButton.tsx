import { Circle } from "./Circle"
import { LeftArrow } from "./LeftArrow"
import { RightArrow } from "./RightArrow"

interface ArrowButton {
    onClick?: () => void;
}

export const ArrowButton = ({onClick}: ArrowButton) => {
    return (
        <button className={'startBtn'} onClick={onClick}>
			<LeftArrow/>
			<Circle/>
			<RightArrow/>
		</button>
    )
}