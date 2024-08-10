export const PrecentDefference = (a, b) => {
    return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
}

export const UpperWord = (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1)
}