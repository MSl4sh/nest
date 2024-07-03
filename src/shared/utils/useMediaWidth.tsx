import { useState, useEffect } from "react";

export default function  useMediaWidth(maxWidth: number) {
    const isWindowClient = typeof window === "object";

    const [windowSize, setWindowSize] = useState(
        isWindowClient
            ? window.innerWidth
            : undefined
    );

    useEffect(() => {
        function setSize() {
            setWindowSize(window.innerWidth);
        }

        if (isWindowClient) {
            window.addEventListener("resize", setSize);
            return () => window.removeEventListener("resize", setSize);
        }
    }, [isWindowClient, setWindowSize]);

    return windowSize ? windowSize>maxWidth :null;
}