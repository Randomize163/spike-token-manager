/* eslint-disable no-console */
import { Spike } from '../lib/spike';
import { trycatch } from '../utils';
import config from '../config';

const sleep = async (ms: number) => {
    return new Promise((resolve, _reject) => {
        setTimeout(resolve, ms);
    });
};

const main = async () => {
    const { url, clientId, clientSecret } = config.test.spike;

    const spike = new Spike({
        spike: {
            url,
            clientId,
            clientSecret,
        },
        redis: {
            uri: 'redis://localhost',
            keepAliveInterval: 1000,
            keepAliveInitialDelay: 1000,
            keepAliveProbesCount: 3,
            tcpUserTimeout: 1000,
        },
    });

    await spike.initialize();

    const parallelRequests = 20;

    let seconds = 0;
    for (;;) {
        const promises: Promise<string>[] = [];
        for (let i = 0; i < parallelRequests; i++) {
            promises.push(spike.getToken('rabaz'));
        }

        const { result: tokens, err } = await trycatch(() => Promise.all(promises));
        if (err) {
            console.error(`Get token failed with error: `, err);
        } else {
            console.log(`Got ${parallelRequests} tokens in parallel. Token after ${seconds++} seconds:`, tokens[0]);
        }

        await sleep(1000);
    }
};

main().catch((err) => {
    console.error(`Main failed with error:`, err);
});
