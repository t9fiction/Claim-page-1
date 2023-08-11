import React from 'react';
import {
  contract_crowdsale_address,
  contract_crowdsale_abi,
  contract_address_vesting,
  contract_abi_vesting,
} from '../config';
import { useAccount, useContractWrite } from 'wagmi';
import {
  BaseError,
  ContractFunctionExecutionError,
  ExecutionRevertedError,
  InsufficientFundsError,
  parseEther,
} from 'viem';
import swal from 'sweetalert2';

export default function useCallManual() {
  const { address, isConnected } = useAccount();
  console.log('insided TGE');
  const { writeAsync } = useContractWrite({
    address: contract_address_vesting,
    abi: contract_abi_vesting,
    functionName: 'claimFromAllVestings',
    account: address,
    // value: parseEther(valueinString),
  });

  const call = React.useCallback(async () => {
    try {
      const writeResult = await writeAsync();
      console.info('contract call successs', writeResult);
    } catch (err) {
      console.log(err);
      if (err instanceof BaseError) {
        const isInsufficientFundsError =
          err.walk((e) => e instanceof InsufficientFundsError) instanceof
          InsufficientFundsError;
        //   const isUserRejectedRequestError =
        //     err.walk((e) => e instanceof UserRejectedRequestError) instanceof
        //     UserRejectedRequestError;

        //   // const revertError = err.walk(
        //   //   (err) => err instanceof ContractFunctionExecutionError
        //   // );
        if (isInsufficientFundsError) {
          swal('Not enough balance');
        }
        //   if (isUserRejectedRequestError) {
        //     alert(isInsufficientFundsError,"isUserRejecte");
        //   }
      }
      if (err instanceof ContractFunctionExecutionError) {
        if (
          err.message.includes(
            'TokenCrowdsaleFLYY: approve token USDT to crowdsale contract'
          )
        ) {
          swal.fire('Approve USDT to Crowdsale contract');
        }
        if (
          err.message.includes(
            'TokenVestingFLYY: INVALID Beneficiary Address!'
          )
        ) {
          swal.fire('No Vesting schedule exist for the user');
        }
        console.log(err);
      }
    }
  }, [writeAsync]);

  return call;
}
