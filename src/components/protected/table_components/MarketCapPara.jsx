import React from 'react';

import formatBigNumber from '../../../utils/formatBigNumber';

function MarketCapPara({ marketCap }) {
  return <p>USD {formatBigNumber(marketCap)}</p>;
}

export default MarketCapPara;
