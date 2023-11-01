import React from 'react';
import capitalizeWord from '../../../utils/capitalizeWord';

const cssProps = {
  outerDiv: 'flex items-center',
  imgWidth: 'w-9',
  imgHeight: 'h-9',
  placeholder: 'bg-gray-placeholder',
  innerML: 'ml-2',
};

function LogoAndName({ image, symbol, name }) {
  return (
    <div className={cssProps.outerDiv}>
      <img src={image} alt="logo" className={cssProps.imgWidth} />
      <div className={cssProps.innerML}>
        <h6 className="font-medium">{capitalizeWord(name)}</h6>
        <p className="text-sm text-gray-border-darker">
          {symbol.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export function LogoAndNamePlaceholder() {
  return (
    <div className={`${cssProps.outerDiv} animate-pulse`}>
      <div
        className={`${cssProps.placeholder}  ${cssProps.imgWidth} ${cssProps.imgHeight} rounded-[50%]`}
      />
      <div className={cssProps.innerML}>
        <div className={`${cssProps.placeholder} w-12 h-4`} />
        <div className={`${cssProps.placeholder} w-8 h-3 mt-1`} />
      </div>
    </div>
  );
}

export default LogoAndName;
