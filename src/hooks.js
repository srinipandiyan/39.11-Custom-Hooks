import { useState, useEffect } from "react";
import axios from "axios";

function useFlip(){
    const [isFacingUp, setIsFacingUp] = useState(true);

    const flipCard = () => {
        setIsFacingUp(isUp => !isUp);
    };

    return [isFacingUp, flipCard];
}

export { useFlip };