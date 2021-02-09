import { getTokenCreator, IDepricatedSpikeOptions } from './getTokenCreator';

import { Spike as SpikeAlias } from './spike';

function mainExport(options: IDepricatedSpikeOptions) {
    return getTokenCreator(options);
}

// eslint-disable-next-line no-redeclare
namespace mainExport {
    export type Spike = SpikeAlias;
    export const Spike = SpikeAlias;
}

export = mainExport;
