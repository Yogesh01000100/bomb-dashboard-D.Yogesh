import React, { useMemo } from 'react';
import './index.css'
import moment from 'moment';
import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';
import HomeImage from '../../assets/img/background.jpg';
import { createGlobalStyle } from 'styled-components';
import Page from '../../components/Page';
import useBombFinance from '../../hooks/useBombFinance';
import { roundAndFormatNumber } from '../../0x';
import { Typography } from '@material-ui/core';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import ProgressCountdown from './components/ProgressCountdown';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useBombStats from '../../hooks/useBombStats';
import usebShareStats from '../../hooks/usebShareStats';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useBtcStats from '../../hooks/useBtcStats';
import useBondStats from '../../hooks/useBondStats';
import { getDisplayBalance } from '../../utils/formatBalance';
import usetShareStats from '../../hooks/usetShareStats';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useStakeToBoardroom from '../../hooks/useStakeToBoardroom';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useStakedBombBalance from '../../hooks/useTotalStakedBombBalance';

import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';


import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import useStakedBalance from '../../hooks/useStakedBalance';
import useSuppliedBtcbBalance from '../../hooks/useTotalSuppliedBtcbBalance';
import useSuppliedBombBalance from '../../hooks/useTotalSuppliedBombBalance';
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
import useWithdrawCheck from '../../hooks/boardroom/useWithdrawCheck';
import useHarvestFromBoardroom from '../../hooks/useHarvestFromBoardroom';

import DepositModal from './components/DepositModal';

import useModal from '../../hooks/useModal';

import useSupplyToBomb from '../../hooks/useSupplyToBomb';
import useTokenBalance from '../../hooks/useTokenBalance';


const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

function Dashboard() {
  const stakedbombbalance = useStakedBombBalance();
  const currentEpoch = useCurrentEpoch();
  const bombFinance = useBombFinance();
  const { to } = useTreasuryAllocationTimes();
  const bombStats = useBombStats();
  const bshare = usebShareStats();
  const bond = useBondStats();
  const btc = useBtcStats();
  const x = usetShareStats();
  const o = useEarningsOnBoardroom();
  const op = useTotalValueLocked();
  const kp = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
  const bombp = useStakedTokenPriceInDollars('BOMB', bombFinance.BOMB);

  const totalStaked = useTotalStakedOnBoardroom();
  const StakeToBoardroom = useStakeToBoardroom();
  const bShareStats = usebShareStats();
  const bondstats = useBondStats();
  const etwap = useCashPriceInEstimatedTWAP();
  const lastepoc = useCashPriceInLastTWAP();
  const stakedBombBalance = Number(useSuppliedBombBalance() / 1000000000000000000).toFixed(2);
  const stakedBtcbBalance = Number(useSuppliedBtcbBalance() / 1000000000000000000).toFixed(5);
  const canClaimReward = useClaimRewardCheck();
  const canWithdraw = useWithdrawCheck();
  const { onRedeem } = useRedeemOnBoardroom();
  const { onReward } = useHarvestFromBoardroom();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const { onStake } = useSupplyToBomb();
  const tokenBalance = useTokenBalance(bombFinance.BOMB);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'BOMB'}
    />,
  );

  const stakedbombbalancex = useMemo(
    () => (stakedbombbalance ? Number(stakedbombbalance._isBigNumber).toFixed(2) : null),
    [stakedbombbalance],
  );

  const etwapx = useMemo(
    () => (etwap ? Number(etwap.priceInDollars).toFixed(2) : null),
    [etwap],
  );
  const lastepocx = useMemo(
    () => (lastepoc ? Number(lastepoc._isBigNumber).toFixed(2) : null),
    [lastepoc],
  );

  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombcsupply = useMemo(
    () => (bombStats ? Number(bombStats.circulatingSupply).toFixed(2) : null),
    [bombStats],
  );
  const bombtsupply = useMemo(
    () => (bombStats ? Number(bombStats.totalSupply).toFixed(2) : null),
    [bombStats],
  );
  const bondcsupply = useMemo(
    () => (bondstats ? Number(bondstats.circulatingSupply).toFixed(2) : null),
    [bondstats],
  );
  const bondtsupply = useMemo(
    () => (bondstats ? Number(bondstats.totalSupply).toFixed(2) : null),
    [bondstats],
  );
  const bshareindollar = useMemo(
    () => (bshare ? Number(bshare.priceInDollars).toFixed(2) : null),
    [bshare],
  );
  const bondshareindollar = useMemo(
    () => (bond ? Number(bond.priceInDollars).toFixed(2) : null),
    [bond],
  );
  const y = useMemo(
    () => (x ? Number(x.priceInDollars).toFixed(2) : null),
    [x],
  );

  const eon_boardroom = useMemo(
    () => (o ? Number(o._isBigNumber).toFixed(2) : null),
    [o],
  );
  const tson_boardroom = useMemo(
    () => (o ? Number(o._isBigNumber).toFixed(2) : null),
    [o],
  );

  const p = useMemo(
    () => (StakeToBoardroom ? Number(StakeToBoardroom.onStake).toFixed(2) : null),
    [StakeToBoardroom],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);
  const bShareCSupply = useMemo(() => (bShareStats ? String(bShareStats.circulatingSupply) : null), [bShareStats]);



  return (
    <Page>
      <BackgroundImage />
      <div className='glop'>
      <div className='bg'>
        <div className='sop'>
          Bomb Finance Summary
        </div>
        <div style={{ borderBottom: '1px solid rgba(195, 197, 203, 0.75)', width: '100%', margin: '10px 0' }}></div>
        <div className='jo'>
          <div class="crd">
            <div className='headr'>
              <p>                 {'   '}   {'  '}      </p>
              <div>Current Supply</div>
              <div>Total Supply</div>
              <div>Price</div>
            </div>
            <div style={{ borderBottom: '1px solid rgba(195, 197, 203, 0.75)', width: '100%', margin: '10px 0' }}></div>
            <div class="temp">
              <div className='arrange1'>
                <div className="navTokenIcon bomb im_icon_"></div>{' '}
                <div>$BOMB</div>
              </div>

              <div>{roundAndFormatNumber(bombcsupply, 2)}</div>
              <div>{roundAndFormatNumber(bombtsupply, 2)}</div>
              <div className='orient'>
                ${bombPriceInDollars}
                <div>$1.05BTCB</div>
              </div>

            </div>
            <div style={{ borderBottom: '1px solid rgba(195, 197, 203, 0.75)', width: '100%', margin: '10px 0' }}></div>
            <div class="temp">
              <div className='arrange1'>
                <div className="navTokenIcon bshare im_icon_"></div>{' '}
                <div>$BSHARE</div>
              </div>
              <div>{roundAndFormatNumber(bShareCSupply, 2)}</div>
              <div>{roundAndFormatNumber(bShareTotalSupply, 2)}</div>


              <div className='orient'>
                ${bshareindollar}
                <div>$1.05BTCB</div>
              </div>

            </div>
            <div style={{ borderBottom: '1px solid rgba(195, 197, 203, 0.75)', width: '100%', margin: '10px 0' }}></div>
            <div class="temp">

              <div className='arrange1'>
                <div className="navTokenIcon btc im_icon_"></div>{' '}
                <div>$BBOND</div>
              </div>


              <div>{roundAndFormatNumber(bondcsupply, 2)}</div>
              <div>{roundAndFormatNumber(bondtsupply, 2)}</div>
              <div className='orient'>
                ${bondshareindollar}
                <div>$1.05BTCB</div>
              </div>

            </div>
          </div>
          <div className='crd crd1'>
            <div>
            
              <div className='board_col'>Current Epoch</div>
              <div><Typography>{Number(currentEpoch)}</Typography></div>
              <div>
                <div style={{ borderBottom: '1px solid rgba(195, 197, 203, 0.75)', width: '90%', margin: '10px 0' }}></div>
                <div className='board_col'>Next Epoch in</div>
                <p className='sop'><ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" /></p>

              </div>
              <div style={{ borderBottom: '1px solid rgba(195, 197, 203, 0.75)', width: '90%', margin: '10px -50' }}></div>
              <div>
                <p>Live TWAP: <span className='cepoch'>{etwapx}</span></p>
                <p>TVL: <span className='cepoch'>${op}</span></p>
                <p>Last Epoch TWAP: <span className='cepoch'>{lastepocx}</span></p>
              </div>
            </div>

          </div>
        </div>
      </div>{/* bomb finance summary */}




      <div className='bg1'>   
        <div className='arrange'>
          <div>
            <button className='bt'>Invest now</button>
          </div>
          <div className='two_bt'>
            <div>

              <button className='sbt readd'><div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16">
                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
              </svg></div><div>Chat on Discord</div></button>
            </div>
            <div>
              <button className='sbt readd'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
              </svg>Read Docs</button>
            </div>
          </div>
          <div class="crd-2">{/*   Boardroom  */}

            <div className='top_p'>
              <div className="navTokenIcon bshare im_icon"></div>{' '}
              <div>
                <div className='boardroom'>
                  <h1 className='board_col'>boardroom</h1>
                  <div>
                    <p className='recom'>Recomended</p>
                  </div>

                </div>
                <div>
                  Stake BSHARE and earn BOMB every epoch
                </div>
              </div>
              <div className='TVL'>
                <p>TVL:${op}</p>
              </div>
            </div>
            <div style={{ borderBottom: '1px solid rgba(195, 197, 203, 0.75)', width: '100%', margin: '10px 0' }}></div>
            <div className='total_stake'>
              <p>Total staked:<span> <Typography>{getDisplayBalance(totalStaked)}</Typography> </span></p>
            </div>
            <div className='bottom_p'>
              <div className='bottom_p_p'>
                <p>Daily Returns:</p>
                <div>2%</div>
              </div>
              <div className='bottom_p_p'>
                <p>Your Stake:</p>
                <div>{Math.round(stakedbombbalancex*100)/100}</div>
                
                <p>${kp}</p>
              </div>
              <div className='bottom_p_p'>
                <p>Earned:</p>
                <div>{eon_boardroom}</div>
                <p>${bombp}</p>
              </div>
              <div>
                <div className='bt_p'>
                  <div>
                    <button onClick={onPresentDeposit} className='titem'>Deposit<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                    </svg></button>
                  </div>

                  <div>
                    <button onClick={onRedeem} className='titem'>Withdraw<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                    </svg></button>
                  </div>
                </div>
                <div>
                  <button
                    onClick={onReward}
                    className='titem_1'>Claim Rewards</button>
                </div>



              </div>
            </div>

          </div>
        </div>
        <div className='crd-4'>
          <div className='Lnews'>
            <h1 className='board_col'>Latest News</h1>
          </div>

        </div>

      </div>





      <div class="crd-2 crd-3">
        <div className='top_p'>
          <div className='bt_p_bt'>
          <div className='combined_p'>
            <div className='boardroom'>
              <h1 className='board_col'>Bomb Farms</h1>
              <div>
              </div>
            </div>
            <div>
              <p>Stake your LP tokens in our farms to start earning $BSHARE</p>
            </div>
          </div>
          <div className='TVL1'>
                  <button
                    onClick={onReward}
                    className='titem_1'>Claim All
                  </button>
            </div>
        </div>
        </div>
        <div className='top_p'>
          <div className="navTokenIcon bshare im_icon"></div>{' '}
          <div>
            <div className='boardroom'>
              <h1 className='board_col'>BOMB-BTCB</h1>
              <div>
                <p className='recom'>Recomended</p>
              </div>
              

            </div>

          </div>
          
        </div>
        <div style={{ borderBottom: '1px solid rgba(195, 197, 203, 0.75)', width: '100%', margin: '10px 0' }}></div>


        <div className='total_stake'>
          <p>Total staked: <Typography>{getDisplayBalance(totalStaked)}</Typography></p>
        </div>
        <div className='bottom_p'>
          <div className='bottom_p_p'>
            <p>Daily Returns:</p>
            <div>2%</div>
          </div>
          <div className='bottom_p_p'>
            <p>Your Stake:</p>
            <div>$1660.4413</div>
            <p>$1171.62</p>
          </div>
          <div className='bottom_p_p'>
            <p>Earned:</p>
            <div>1660.4413</div>
            <p>$1171.62</p>
          </div>
          <div>
            <div className='bt_p'>
              <div>
              <button onClick={onPresentDeposit} className='titem'>Deposit<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                    </svg></button>
              </div>
              <button onClick={onRedeem} className='titem'>Withdraw<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                    </svg></button>
              <div>
                <button className='titem_1'>Claim Rewards</button>
              </div>
            </div>


          </div>
        </div>
        <div style={{ borderBottom: '0.25px solid #00ADE8', width: '100%', margin: '10px 0' }}></div>




        <div className='top_p'>
          <div className="navTokenIcon bshare im_icon"></div>{' '}
          <div>
            <div className='boardroom'>
              <h1 className='board_col'>BSHARE-BNB</h1>
              <div>
                <p className='recom'>Recomended</p>
              </div>

            </div>

          </div>
          
        </div>
        <div style={{ borderBottom: '1px solid rgba(195, 197, 203, 0.75)', width: '100%', margin: '10px 0' }}></div>
        <div className='total_stake'>
          <p>Total staked: 7232</p>
        </div>
        <div className='bottom_p'>
          <div className='bottom_p_p'>
            <p>Daily Returns:</p>
            <div>2%</div>
          </div>
          <div className='bottom_p_p'>
            <p>Your Stake:</p>
            <div>6.000</div>
            <p>$1171.62</p>
          </div>
          <div className='bottom_p_p'>
            <p>Earned:</p>
            <div>1660.4413</div>
            <p>$1171.62</p>
          </div>
          <div>
            <div className='bt_p'>
              <div>
            <button onClick={onPresentDeposit} className='titem'>Deposit<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                    </svg></button>
              </div>
              <button onClick={onRedeem} className='titem'>Withdraw<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                    </svg></button>
              <div>
                <button className='titem_1'>Claim Rewards</button>
              </div>
            </div>


          </div>
        </div>


      </div>










      <div className="crd-2 crd-3">

        <div className='top_p'>
          <div className="navTokenIcon bshare im_icon"></div>{' '}
          <div>
            <div className='boardroom'>
              <h1 className='board_col'>Bonds</h1>
              
            </div>
            <div>BBond can be purchased only on contraction periods, when TWAP of BOMB is below 1</div>
          </div>
          
        </div>
        
        
        <div className='bottom_p'>
          <div className='bottom_p_p'>
            <p>Current Price: (Bomb)^2</p>
            <div className='board_col'>BBOND=6.2872</div>
          </div>
          <div className='bottom_p_p'>
            <p>Available to redeem:</p>
            <div className='arrange1 board_col'>
              <div className="navTokenIcon bshare im_icon_"></div>{' '}<div>456</div>
            </div>
          </div>
          <div className="col_d">
            <div className='bt_p_bt'>
              <div className='marg'>
                  <div>Purchase BBond</div>
                  <div>Bomb is over peg</div>
              </div>
              <div>
                <button className='titem'>Purchase<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg></button>
              </div>
              
            </div>
            <div style={{ borderBottom: '1px solid rgba(195, 197, 203, 0.75)', width: '100%', margin: '10px 0' }}></div>
            <div className='bt_p_bt'>
              <div className='marg'>
                  <div>Redeem Bomb</div>
                  
              </div>
              <div>
                <button className='titem'>Redeem <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                    </svg></button>
              </div>
              
            </div>
          </div>

          
        </div>

      </div>
      </div>
    </Page>
  );
}
export default Dashboard