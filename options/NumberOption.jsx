import React from 'react';

function isNumber(obj) {
  return !isNaN(parseFloat(obj));
}
function parseNumber(value) {
  return isNumber(value) && value >= 1 ? value : 1;
}

export default function NumberOption({ label, value, change }) {
  return (
    <div className="row option">
      <span className="label">{label}</span>
      <div>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => {
            event.preventDefault();
            const rawValue = event.currentTarget.value;
            const newValue = parseNumber(rawValue);
            change(newValue);
          }}
        />
      </div>
    </div>
  );
}
