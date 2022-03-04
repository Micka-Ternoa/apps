// Copyright 2017-2022 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId } from '@polkadot/types/interfaces';
import type { Codec } from '@polkadot/types/types';
import type { PoolInfo } from './types';

import { createNamedHook, useApi, useCallMulti } from '@polkadot/react-hooks';

const options = {
  transform: ([bonded, reward]: [Record<string, Codec>, Record<string, Codec>]): PoolInfo => ({
    bonded,
    reward
  })
};

function usePoolInfoImpl (id: AccountId): PoolInfo {
  const { api } = useApi();

  return useCallMulti([
    [api.query.nominationPools.bondedPools, id],
    [api.query.nominationPools.rewardPools, id]
  ], options);
}

export default createNamedHook('usePoolInfo', usePoolInfoImpl);