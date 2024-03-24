import { useEffect, useState } from "react";

const CountDown = (props) => {

    const [count, setCount] = useState(10);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    useEffect(() => {
        if (count === 0) {
            props.handleSubmit();
            return;
        }
        const timer = setInterval(() => {
            setCount(prevCount => prevCount - 1)
        }, 1000)

        return () => {
            clearInterval(timer)
        }

    }, [count])

    return (
        <>
            <div>
                {formatTime(count)}
            </div>
        </>
    )
};

export default CountDown;
