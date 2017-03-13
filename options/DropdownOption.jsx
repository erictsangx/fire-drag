import React from 'react';

function renderOption(data, defaultValue) {
  return data.map((item) => {
    if (defaultValue === item.value) {
      return (<option value={item.value} selected>{item.label}</option>);
    }
    return (<option value={item.value}>{item.label}</option>);
  });
}

export default function DropdownOption({ label, data, value, change }) {
  return (
    <div className="row option">
      <span className="label">{label}</span>
      <div>
        <select
          onChange={(event) => {
            change(event.target.value);
          }}
        >
          {renderOption(data, value)}
        </select>
      </div>
    </div>
  );
}

