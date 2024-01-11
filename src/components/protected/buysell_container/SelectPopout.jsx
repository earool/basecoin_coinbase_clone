import React from 'react';

import LogoAndName from '../table_components/LogoAndName';
import { ReactComponent as MagnifyingGlassIcon } from '../../../assets/icons/others/magnifying_glass.svg';
import { ReactComponent as DoneIcon } from '../../../assets/icons/others/done.svg';

// make search input working

function SelectPopout({ data, onOptionChange }) {
  const { selectedAssetUuid, assetsData, popoutType, position } = data;

  const assetsArray = assetsData.map((asset) => (
    <button
      className="mb-4 w-full relative"
      key={asset.uuid}
      type="button"
      onClick={() => onOptionChange(popoutType, position, asset.uuid)}
    >
      {selectedAssetUuid === asset.uuid && (
        <div className="text-my-blue w-4 h-4 absolute right-4 top-[calc(50%-16px)]">
          <DoneIcon />
        </div>
      )}
      <li
        className={`py-2 px-4 rounded-lg hover:bg-gray-light-hover ${
          asset.uuid === selectedAssetUuid ? `bg-gray-light` : ''
        }`}
      >
        <LogoAndName
          image={asset.iconUrl}
          symbol={asset.symbol}
          name={asset.name}
        />
      </li>
    </button>
  ));

  return (
    <div className="flex flex-col">
      <form className="px-3 py-2 mb-3 mr-3 border border-gray-border rounded-sm flex items-center flex-1 text-sm">
        <button
          type="button"
          className="w-4 h-4 text-gray-400 mr-2"
          onClick={() => console.log('xD')}
        >
          <MagnifyingGlassIcon />
        </button>
        <input
          placeholder="Search"
          type="text"
          className="focus:outline-none"
        />
      </form>
      <ul className="overflow-auto pr-3 mr-[-14px] max-h-[250px] mt-2">
        {assetsArray}
      </ul>
    </div>
  );
}

export default SelectPopout;
