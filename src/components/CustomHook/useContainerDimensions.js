import { useState,useEffect, useRef } from "react";

export const useContainerDimensions = (myRef) => {
    const fallbackRef = useRef(document.body);
    const refToUse = myRef && myRef.current ? myRef.current : fallbackRef;
    const [dimensions, setDimensions] = useState({ width: refToUse.current.offsetWidth, height: refToUse.current.offsetHeight })
    // const getDimensions = () => {
    //         console.log('Check: refToUse: ',refToUse.current.offsetWidth);
    //         return {
    //             width: refToUse.current.offsetWidth,
    //             height: refToUse.current.offsetHeight
    //         }
    //     }
    useEffect(() => {          
        const handleResize = () => {
            setDimensions({
                width: refToUse.current.offsetWidth,
                height: refToUse.current.offsetHeight
            })
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })    
    return dimensions;
};