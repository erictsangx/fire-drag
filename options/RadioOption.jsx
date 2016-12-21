import React from 'react';

export default function RadioOption({ label, active, change }) {
  return (
    <div className="row option">
      <span className="label">{label}</span>
      <div>
        <input type="radio" name={label} checked={active} onChange={() => change(true)} />
        <span>Frontground</span>
        <input type="radio" name={label} checked={!active} onChange={() => change(false)} />
        <span>Background</span>
      </div>
    </div>
  );
}
