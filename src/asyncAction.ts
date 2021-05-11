import { PayloadAction } from '@reduxjs/toolkit';

type AsyncMeta<OnSuccessParamsT> = {
  onSuccess: (params: OnSuccessParamsT) => void;
  onError: (errors: string[]) => void;
};

export type AsyncActionParams<PayloadT, OnSuccessParamsT> = {
  payload: PayloadT;
  meta: AsyncMeta<OnSuccessParamsT>;
};

export type AsyncPayloadAction<PayloadT, OnSuccessParamsT> = PayloadAction<
  PayloadT,
  string,
  AsyncMeta<OnSuccessParamsT>
>;
