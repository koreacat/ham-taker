import { Circle } from "./Circle"
import { LeftArrow } from "./LeftArrow"
import { RightArrow } from "./RightArrow"

interface ArrowButtonProps {
    onClick?: () => void;
}

export const ArrowButton = ({onClick}: ArrowButtonProps) => {
    return (
        <button className={'startBtn'} onClick={onClick}>
			<LeftArrow/>
			<Circle/>
			<RightArrow/>
		</button>
    )
}