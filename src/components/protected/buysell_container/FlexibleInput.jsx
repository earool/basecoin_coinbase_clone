import React, { useState } from 'react';

function FlexibleInput() {
  // eslint-disable-next-line no-unused-vars
  const [styles, setStyles] = useState({
    dMarginLeft: '160px',
    iFontSize: '64px',
  });

  const changeHandler = (e) => {
    const length = e.target.value.length > 1 ? e.target.value.length : 1;
    const width = e.target.clientWidth;
    console.log(width);

    setStyles((prevs) => {
      const { dMarginLeft, iFontSize } = prevs;
      let ml = parseInt(dMarginLeft, 10);
      let fs = parseInt(iFontSize, 10);

      const isOverflowing = ml < 40;
      ml = isOverflowing ? ml : 160 - 30 * (length - 1);
      // doesnt work right now
      if (isOverflowing && width > 264) {
        fs *= 0.7;
      }

      return { dMarginLeft: `${ml}px`, iFontSize: `${fs}px` };
    });
  };

  return (
    <div className="flex ml-[160px]" style={{ marginLeft: styles.dMarginLeft }}>
      <div className="text-[25px] text-gray-border-darker w-[14px]">
        <span>$</span>
      </div>
      <input
        className="focus:outline-none text-my-blue text-[64px] w-full"
        onChange={changeHandler}
        placeholder="0"
        minLength={1}
        style={{ fontSize: styles.iFontSize }}
      />
    </div>
  );
}

export default FlexibleInput;
