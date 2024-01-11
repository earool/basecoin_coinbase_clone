import React, { useState, useEffect } from 'react';

import TransactionActionButtons from './TransactionActionButtons';
import TransactionInputContainer from './TransactionInputContainer';
import SelectionRowsContainer from './SelectionRowsContainer';
import Button from '../../UI/Button';
import BuySellPopout from './BuySellPopout';
import Spinner from '../../UI/Spinner';
import useFetchBuySellData from '../../../hooks/useFetchBuySellData';

function BuySellContainer() {
  const [transactionAction, setTransactionAction] = useState('Buy');
  const [options, setOptions] = useState({ option1: null, option2: null });
  const [showPopout, setShowPopout] = useState(false);
  const [popoutData, setPopoutData] = useState(null);
  const [transactionInputValue, setTransactionInputValue] = useState('');

  const {
    assetsData,
    ownAssetsData,
    isLoading,
    isError,
    isSuccess,
    error,
    dollarOption,
  } = useFetchBuySellData();

  useEffect(() => {
    if (assetsData.length) {
      setOptions({ option1: assetsData[0], option2: dollarOption });
    }
  }, [assetsData, dollarOption, isSuccess]);

  const transactionActionChangeHandler = (action) => {
    setTransactionAction(action);
    if (action === 'Buy') {
      setOptions({ option1: assetsData[0], option2: dollarOption });
    }

    if (action === 'Sell') {
      setOptions({ option1: ownAssetsData[0], option2: dollarOption });
    }

    if (action === 'Convert') {
      setOptions(() => {
        if (ownAssetsData[0].uuid === assetsData[0].uuid) {
          return { option1: ownAssetsData[0], option2: assetsData[1] };
        }

        return { option1: ownAssetsData[0], option2: assetsData[0] };
      });
    }
  };

  const buttonText = {
    Buy: `Buy ${options.option1?.name}`,
    Sell: `Sell ${options.option1?.name}`,
    Convert: `Convert ${options.option1?.name}`,
  };

  const transactionInputHandler = (value) => {
    // check if value is bigger than available cash
    setTransactionInputValue(value);
  };

  const optionChangeHandler = (popoutType, position, uuid) => {
    const data = popoutType === 'own' ? ownAssetsData : assetsData;
    const option = position === '1' ? 'option1' : 'option2';
    const [selected] = data.filter((asset) => asset.uuid === uuid);

    setOptions((prevs) => {
      return { ...prevs, [option]: { ...selected } };
    });
    setShowPopout(false);
  };

  // handling for providing the appropriate data for popouts,
  // there is 6 versions of popouts, the handling of it is made in BuySellPoput
  // the function is called in SelectionRowsContainer
  const togglePopoutHandler = (
    popoutType,
    position = null,
    selectedAssetUuid = null
  ) => {
    if (popoutType === 'preview') {
      setPopoutData({
        popoutType,
        options,
        transactionAction,
        value: parseFloat(transactionInputValue),
      });
    } else if (popoutType === 'asset') {
      setPopoutData({ popoutType, assetsData, selectedAssetUuid, position });
    } else if (popoutType === 'own') {
      setPopoutData({
        popoutType,
        assetsData: ownAssetsData,
        selectedAssetUuid,
        position,
      });
    } else {
      setPopoutData({ ...dollarOption, popoutType });
    }
    setShowPopout((prevs) => !prevs);
  };

  const closePopoutHandler = () => {
    setShowPopout(false);
  };

  let content;

  if (isLoading) {
    content = (
      <div className="absolute top-1/2 left-1/2">
        <Spinner />;
      </div>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  } else if (isSuccess && options.option1) {
    content = (
      <>
        <div className="main-container">
          <TransactionActionButtons
            onActionChange={transactionActionChangeHandler}
            activeAction={transactionAction}
          />
          <TransactionInputContainer
            onInputChange={transactionInputHandler}
            value={transactionInputValue}
          />
          <SelectionRowsContainer
            transactionAction={transactionAction}
            options={options}
            onToggle={togglePopoutHandler}
          />
          <div className="my-4 mx-2 px-5">
            <Button
              color="blue"
              ifFull
              disabled={!transactionInputValue || transactionInputValue === '.'}
              onClick={() => togglePopoutHandler('preview')}
            >
              {buttonText[transactionAction]}
            </Button>
          </div>
        </div>
        {showPopout && (
          <BuySellPopout
            onClose={closePopoutHandler}
            data={popoutData}
            onOptionChange={optionChangeHandler}
          />
        )}
      </>
    );
  }

  return <div className="min-w-[300px] relative">{content}</div>;
}

export default BuySellContainer;
