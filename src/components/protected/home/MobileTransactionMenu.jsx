import React from 'react';

import IconBtnMobileMenu from '../../UI/IconBtnMobileMenu';
import { ReactComponent as BuyIcon } from '../../../assets/icons/headerbar/plus.svg';
import { ReactComponent as SellIcon } from '../../../assets/icons/headerbar/minus.svg';
import { ReactComponent as SendIcon } from '../../../assets/icons/headerbar/up_arrow.svg';
import { ReactComponent as ReceiveIcon } from '../../../assets/icons/headerbar/down_arrow.svg';
import { ReactComponent as ConvertIcon } from '../../../assets/icons/headerbar/convert.svg';
import { ReactComponent as MoreIcon } from '../../../assets/icons/headerbar/more.svg';

function MobileTransactionMenu() {
  return (
    <div className="sm:hidden mb-4 grid-flow-col grid c2:grid-cols-2 c3:grid-cols-3 c4:grid-cols-4">
      <IconBtnMobileMenu name="Buy" myStyle="hidden c2:flex">
        <BuyIcon />
      </IconBtnMobileMenu>
      <IconBtnMobileMenu name="Sell " myStyle="hidden c3:flex">
        <SellIcon />
      </IconBtnMobileMenu>
      <IconBtnMobileMenu name="Send" myStyle="hidden c4:flex">
        <SendIcon />
      </IconBtnMobileMenu>
      <IconBtnMobileMenu name="Receive" myStyle="hidden c5:flex">
        <ReceiveIcon />
      </IconBtnMobileMenu>
      <IconBtnMobileMenu name="Convert" myStyle="hidden c5:flex">
        <ConvertIcon />
      </IconBtnMobileMenu>
      <IconBtnMobileMenu name="More" myStyle="flex c5:hidden">
        <MoreIcon />
      </IconBtnMobileMenu>
    </div>
  );
}

export default MobileTransactionMenu;
