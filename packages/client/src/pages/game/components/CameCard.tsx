import { useState } from "react";

export default function GameCard(props: {character: string, value: number}) {
    // Карта должна иметь несколько характеристик
    const [character, setCharacter] = useState(props.character)
    const [value, setValue] = useState(props.value)

    return  <div>Карта</div>;
}
