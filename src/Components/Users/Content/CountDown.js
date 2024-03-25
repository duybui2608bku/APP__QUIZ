import { useEffect, useState } from "react";

const CountDown = (props) => {

    const { submit } = props;
    const [count, setCount] = useState(300);

    useEffect(() => {
        if (submit) {
            setCount(0);
        } else if (count > 0) {
            const timer = setInterval(() => {
                setCount(prevCount => prevCount - 1);
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }

    }, [count, submit]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
            <div>
                {formatTime(count)}
            </div>
        </>
    );
};

export default CountDown;
