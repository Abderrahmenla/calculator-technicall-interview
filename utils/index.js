import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const opposite = (str) => {
    let term = "";
    let i = 0;
    while (str[i]) {
        if (str[i] === "-" && str[i + 1] && str[i + 1] === "-") {
            term = term + "-";
            i++;
        } else if (str[i] === "-") {
            term = term + "+";
        } else if (str[i] === "+") {
            term = term + "-";
        } else {
            term = term + str[i];
        }
        i++;
    }
    return term;
};

const process = (term, neutralElement) => {
    let characters = [")", "+", "-", "/", "*"];
    let i = 0;
    if (!term || term === "") return neutralElement;
    while (characters[i]) {
        let ind = term.indexOf(characters[i]);
        if (ind !== -1) {
            if (i === 0) {
                let lastOpenParenthesis = term.substr(0, ind).lastIndexOf("(");
                if (lastOpenParenthesis !== -1) {
                    return process(
                        term.substr(0, lastOpenParenthesis) +
                            process(
                                term.substr(
                                    lastOpenParenthesis + 1,
                                    ind - lastOpenParenthesis - 1
                                )
                            ) +
                            term.substr(ind + 1, term.length - ind),
                        0
                    );
                } else return 0;
            }
            if (i === 1) {
                return (
                    process(term.substr(0, ind), 0) +
                    process(term.substr(ind + 1, term.length), 0)
                );
            } else if (i === 2 && term[ind - 1] !== "*") {
                // break
                return (
                    process(term.substr(0, ind), 0) -
                    process(opposite(term.substr(ind, term.length)), 0)
                );
            } else if (i === 3) {
                return (
                    process(term.substr(0, ind), 1) /
                    process(term.substr(ind + 1, term.length), 1)
                );
            } else if (i === 4) {
                return (
                    process(term.substr(0, ind), 1) *
                    process(term.substr(ind + 1, term.length), 1)
                );
            }
        }
        i++;
    }
    return parseFloat(term);
};

const createGraph = (current) => {
    let abscisses = [
        "(-100)",
        "(-90)",
        "(-80)",
        "(-70)",
        "(-60)",
        "(-50)",
        "(-40)",
        "(-30)",
        "(-20)",
        "(-10)",
        "0",
        "10",
        "20",
        "30",
        "40",
        "50",
        "60",
        "70",
        "80",
        "90",
        "100",
    ];
    let dataLine = [];
    let expr;
    let i = 0;
    while (i < abscisses.length) {
        expr = current.replace("Y = ", "").replace("x", abscisses[i]);
        dataLine[i] = process(expr);
        i++;
    }
    var ctx = document.getElementById("myChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: [
                "-100",
                "-90",
                "-80",
                "-70",
                "-60",
                "-50",
                "-40",
                "-30",
                "-20",
                "-10",
                "0",
                "10",
                "20",
                "30",
                "40",
                "50",
                "60",
                "70",
                "80",
                "90",
                "100",
            ],
            datasets: [
                {
                    label: "Graph y = f(x)",
                    data: dataLine,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });
};

const operandIsAllowed = (current, operations, lastchar) => {
    if (current !== "0" && !operations.includes(lastchar) && lastchar !== "(")
        return true;
    return false;
};
const numberIsAllowed = (lastchar) => {
    return lastchar !== ")" && lastchar !== "x";
};
const xIsAllowed = (lastchar, operations, current) => {
    return lastchar === "(" || operations.includes(lastchar) || current === "0";
};

const openParenthesisIsAllowed = (operations, current, lastchar) => {
    if (operations.includes(lastchar) || current === "0" || lastchar === "(") {
        if (lastchar !== "x") return true;
    }
    return false;
};

const closeParenthesisIsAllowed = (openParenthesis, operations, lastchar) => {
    if (openParenthesis > 0 && !operations.includes(lastchar)) return true;
    return false;
};
const dotIsAllowed = (operations, parenthesis, countDotinCurrentNb, lastchar) => {
    if (
        !operations.includes(lastchar) &&
        !parenthesis.includes(lastchar) &&
        countDotinCurrentNb === 0 &&
        lastchar !== "x"
    )
        return true;
    return false;
};

export {
    opposite,
    process,
    createGraph,
    operandIsAllowed,
    numberIsAllowed,
    xIsAllowed,
    openParenthesisIsAllowed,
    closeParenthesisIsAllowed,
    dotIsAllowed,
};
