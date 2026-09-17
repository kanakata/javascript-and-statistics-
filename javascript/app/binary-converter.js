import { Binary } from "../binary/binary.js";

const decimalInput = document.getElementById("decimalInput");
const convertButton = document.getElementById("convertButton");
const binaryOutput = document.getElementById("binaryOutput");

convertButton.addEventListener("click", () => {
    const decimalValue = parseInt(decimalInput.value);
    if (!isNaN(decimalValue)) {
        const binaryValue = Binary.toBinary(decimalValue);
        binaryOutput.textContent = binaryValue;
    } else {
        binaryOutput.textContent = "Invalid input";
    }
});
