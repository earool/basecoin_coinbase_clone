import React, { useState, useRef } from 'react';

import { validateBuySellInputValue } from '../../../utils/validators';

const SCALE_STEP = 0.05;

function calcMaxScale(containerWidth, textWidth, scale) {
  if (containerWidth < textWidth * scale) {
    return scale > 1 ? 1 : scale - SCALE_STEP;
  }
  return calcMaxScale(containerWidth, textWidth, scale + SCALE_STEP);
}

function calcScale(containerWidth, textWidth, scale) {
  if (containerWidth > textWidth * scale) {
    if (scale >= 1) {
      return 1;
    }
    return calcMaxScale(containerWidth, textWidth, scale);
  }
  return calcScale(containerWidth, textWidth, scale - SCALE_STEP);
}

function FlexibleInput({ onInputChange, value }) {
  const [styles, setStyles] = useState({
    iWidth: '36px',
    scale: 1,
  });
  const measuringTextDiv = useRef();

  const changeHandler = (e) => {
    if (!validateBuySellInputValue(e.target.value)) {
      return;
    }
    const containerWidth = e.target.parentElement.parentElement.clientWidth;
    measuringTextDiv.current.innerText = e.target.value || '0';
    const textWidth = measuringTextDiv.current.clientWidth;

    setStyles((prevs) => {
      const newScale = calcScale(containerWidth, textWidth, prevs.scale);
      return {
        iWidth: textWidth,
        scale: newScale,
      };
    });

    onInputChange(e.target.value);
  };

  return (
    <div
      className="flex justify-center max-w-[232px] flex-1"
      style={{ transform: `scale(${styles.scale})` }}
    >
      <div className="flex justify-center">
        <span className="text-[25px] text-gray-border-darker w-[14px]">$</span>
        <input
          inputMode="decimal"
          className="focus:outline-none text-my-blue text-[64px] box-border overflow-hidden"
          onChange={changeHandler}
          placeholder="0"
          value={value}
          style={{ width: value === '' ? '36px' : styles.iWidth }}
        />
        <div
          ref={measuringTextDiv}
          className="invisible w-auto fixed min-width-[36px] text-[64px]"
        />
      </div>
    </div>
  );
}

export default FlexibleInput;
