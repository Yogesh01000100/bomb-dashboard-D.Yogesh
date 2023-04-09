import React from 'react';
import styled from 'styled-components';

import { Button, Card } from '@material-ui/core';

// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import useBombFinance from '../../../hooks/useBombFinance';
import Label from '../../../components/Label';
import TokenSymbol from '../../../components/TokenSymbol';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useModal from '../../../hooks/useModal';
import ExchangeModal from '../../Bond/components/ExchangeModal';
import ERC20 from '../../../bomb-finance/ERC20';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';
import { useWallet } from "use-wallet";
import UnlockWallet from '../../../components/UnlockWallet';
import '../index.css'

interface ExchangeCardProps {
    action: string;
    fromToken: ERC20;
    fromTokenName: string;
    toToken: ERC20;
    toTokenName: string;
    priceDesc: string;
    onExchange: (amount: string) => void;
    disabled?: boolean;
    disabledDescription?: string;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
    action,
    fromToken,
    fromTokenName,
    toToken,
    toTokenName,
    priceDesc,
    onExchange,
    disabled = false,
    disabledDescription,
}) => {
    const catchError = useCatchError();
    const {
        contracts: { Treasury },
    } = useBombFinance();
    const [approveStatus, approve] = useApprove(fromToken, Treasury.address);

    const { account } = useWallet();
    const balance = useTokenBalance(fromToken);
    const [onPresent, onDismiss] = useModal(
        <ExchangeModal
            title={action}
            description={priceDesc}
            max={balance}
            onConfirm={(value) => {
                onExchange(value);
                onDismiss();
            }}
            action={action}
            tokenName={fromTokenName}
        />,
    );
    return (
        <>
            {!!account ? (
                <>
                    {approveStatus !== ApprovalState.APPROVED && !disabled ? (
                        <button
                            className="titem"
                            disabled={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN}
                            onClick={() => catchError(approve(), `Unable to approve ${fromTokenName}`)}
                        >
                            {`Approve ${fromTokenName}`}
                        </button>
                    ) : (
                        <button
                            className={disabled ? 'titem_' : 'titem'}
                            onClick={onPresent}
                            disabled={disabled}
                        >
                            {action}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                </svg>
                        </button>
                    )}
                </>
            ) : (
                <UnlockWallet />
            )}
        </>
    );
};

const disb=styled.div`background-color: red;
border: 1px solid #95cae0;
color:#fff;
border-radius: 20px;
padding-top: 2.5px;
padding-bottom: 2.5px;
width:98px;
list-style-type: none;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
display: flex;
justify-content: space-between;
align-items: center;
margin: 5px;
height:32px;`;

const StyledCardTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  height: 64px;
  justify-content: center;
  color: #f9d749;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledExchangeArrow = styled.div`
  font-size: 20px;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  width: 100%;
`;

const StyledDesc = styled.span``;


const Titr = styled.div`

    background-color: #ffffff00;
    border: 1px solid #95cae0;
    color:#fff;
    border-radius: 20px;
    padding-top: 2.5px;
    padding-bottom: 2.5px;
    width:98px;
    list-style-type: none;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    height:32px;


`;


const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default ExchangeCard;
