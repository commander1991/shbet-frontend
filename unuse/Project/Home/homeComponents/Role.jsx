import React, { useEffect, useState } from "react";

const TaiXiuGame = () => {
    const [dice1, setDice1] = useState(1);
    const [dice2, setDice2] = useState(1);
    const [dice3, setDice3] = useState(1);
    const [total, setTotal] = useState(0);
    const [result, setResult] = useState("");

    const rollDice = () => {
        const randomDiceValue = () => Math.floor(Math.random() * 6) + 1;
        const newDice1 = randomDiceValue();
        const newDice2 = randomDiceValue();
        const newDice3 = randomDiceValue();
        const newTotal = newDice1 + newDice2 + newDice3;
        setDice1(newDice1);
        setDice2(newDice2);
        setDice3(newDice3);
        setTotal(newTotal);
        if (newTotal < 11) {
            setResult("Xỉu");
        } else {
            setResult("Tài");
        }
    };

    return (
        <div>
            <h1>Tài Xỉu Game</h1>
            <div>
                <p>Dice 1: {dice1}</p>
                <p>Dice 2: {dice2}</p>
                <p>Dice 3: {dice3}</p>
                <p>Total: {total}</p>
                <p>Result: {result}</p>
            </div>
        </div>
    );
};

export default TaiXiuGame;