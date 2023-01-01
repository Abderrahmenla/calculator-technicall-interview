import React, { useState } from "react";
import {
    process,
    createGraph,
    operandIsAllowed,
    numberIsAllowed,
    xIsAllowed,
    openParenthesisIsAllowed,
    closeParenthesisIsAllowed,
    dotIsAllowed,
} from "../../utils";

export default function Calculator() {
    const [current, setCurrent] = useState("0");
    const [lastchar, setLastchar] = useState("0");

    const [openParenthesis, setOpenParenthesis] = useState(0);
    const [countDotinCurrentNb, setCountDotinCurrentNb] = useState(0);
    const operations = ["+", "-", "*", "/"];
    const parenthesis = ["(", ")"];

    const appendNumberHandler = (e) => {
        const value = e.target.innerText;
        console.log(value);
        if (value === "x" && xIsAllowed(lastchar, operations, current)) {
            setLastchar(value);
            if (current !== "0") {
                if (!current.includes("Y = ")) {
                    setCurrent(`Y = ${current}${value}`);
                } else setCurrent(`${current}${value}`);
            } else {
                setCurrent(`Y = ${value}`);
            }
        } else if (numberIsAllowed(lastchar) && value !== "x") {
            setLastchar(value);
            if (current !== "0") {
                if (value === "x" && !current.includes("Y = ")) {
                    setCurrent(`Y = ${current}${value}`);
                } else setCurrent(`${current}${value}`);
            } else {
                setCurrent(`${value}`);
            }
        }
    };

    const displayGraphHandler = () => {
        if (!current.includes("Y = ")) {
            setCurrent(`Y = ${current}`);
        }
        createGraph(current);
    };

    const clearHandler = () => {
        setCurrent("0");
        setLastchar("0");
        setOpenParenthesis(0);
        setCountDotinCurrentNb(0);
    };

    const openParenthHandler = () => {
        if (openParenthesisIsAllowed(operations, current, lastchar)) {
            setLastchar("(");
            setCountDotinCurrentNb(0);
            setOpenParenthesis(openParenthesis + 1);
            if (current === "0") setCurrent("(");
            else setCurrent(current + "(");
        }
    };

    const closeParenthHandler = () => {
        if (closeParenthesisIsAllowed(openParenthesis, operations, lastchar)) {
            setOpenParenthesis(openParenthesis - 1);
            setLastchar(")");
            setCurrent(current + ")");
            setCountDotinCurrentNb(0);
        }
    };

    const operandHandler = (e) => {
        const value = e.target.innerText;
        if (
            operandIsAllowed(current, operations, lastchar) ||
            ((current === "0" || lastchar === "(") && value === "-")
        ) {
            if (current === "0") setCurrent("-");
            else {
                setCurrent(current + value);
            }
            setCountDotinCurrentNb(0);
            setLastchar(value);
        }
    };

    const dotHandler = () => {
        if (
            dotIsAllowed(operations, parenthesis, countDotinCurrentNb, lastchar)
        ) {
            setLastchar(".");
            setCurrent(`${current}.`);
            setCountDotinCurrentNb(countDotinCurrentNb + 1);
        }
    };

    const displayResultHandler = () => {
        if (!current.includes("Y")) setCurrent(process(current, 0));
    };

    return (
        <>
            <div style={{ display: "flex" }}>
                <div className="calculator">
                    <button className="display"> {current}</button>
                    <button onClick={displayGraphHandler} className="zero btn">
                        GRAPH
                    </button>
                    <button onClick={appendNumberHandler} className="one btn">
                        x
                    </button>
                    <button onClick={clearHandler} className="btn">
                        C
                    </button>
                    <button onClick={openParenthHandler} className="btn">
                        (
                    </button>
                    <button onClick={closeParenthHandler} className="btn">
                        )
                    </button>
                    <button onClick={operandHandler} className="operator">
                        /
                    </button>
                    <button onClick={appendNumberHandler} className="btn">
                        7
                    </button>
                    <button onClick={appendNumberHandler} className="btn">
                        8
                    </button>
                    <button onClick={appendNumberHandler} className="btn">
                        9
                    </button>
                    <button onClick={operandHandler} className="operator">
                        *
                    </button>
                    <button onClick={appendNumberHandler} className="btn">
                        4
                    </button>
                    <button onClick={appendNumberHandler} className="btn">
                        5
                    </button>
                    <button onClick={appendNumberHandler} className="btn">
                        6
                    </button>
                    <button onClick={operandHandler} className="operator">
                        -
                    </button>
                    <button onClick={appendNumberHandler} className="btn">
                        1
                    </button>
                    <button onClick={appendNumberHandler} className="btn">
                        2
                    </button>
                    <button onClick={appendNumberHandler} className="btn">
                        3
                    </button>
                    <button onClick={operandHandler} className="operator">
                        +
                    </button>
                    <button onClick={appendNumberHandler} className="zero btn">
                        0
                    </button>
                    <button onClick={dotHandler} className="btn">
                        .
                    </button>
                    <button onClick={displayResultHandler} className="operator">
                        =
                    </button>
                </div>
                <div
                    className="chart-container"
                    style={{
                        position: "relative",
                        height: "40vh",
                        width: "50vw",
                        margin: "auto",
                    }}
                >
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </>
    );
}
