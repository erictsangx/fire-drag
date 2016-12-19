import React from "react";

function isNumber(obj) {
    return !isNaN(parseFloat(obj))
}
function parseNumber(value) {
    if (isNumber(value) && value >= 1) {
        return value
    } else {
        return 1
    }
}

export default function NumberOption({label, value, change}) {
    return (
        <div className="row option">
            <span className="label">{label}</span>
            <div>
                <input type="number" min="0" value={value} onChange={event => {
                    event.preventDefault();
                    const _value = event.currentTarget.value;
                    const value = parseNumber(_value);
                    change(value)
                }}/>
            </div>
        </div>
    )
}