import { getTokenCreator, IDepricatedSpikeOptions } from './getTokenCreator';

import { Spike as SpikeAlias } from './spike';
import { SpikeApi as SpikeApiAlias } from './spike-api';

function mainExport(options: IDepricatedSpikeOptions) {
    return getTokenCreator(options);
}

/* istanbul ignore next */
// eslint-disable-next-line no-redeclare
namespace mainExport {
    export type Spike = SpikeAlias;
    export const Spike = SpikeAlias;

    export type SpikeApi = SpikeApiAlias;
    export const SpikeApi = SpikeApiAlias;
}

export = mainExport;
