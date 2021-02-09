/* eslint-disable no-console */
import { Spike } from '../lib/spike';
import { trycatch } from '../utils';

const sleep = async (ms) => {
    return new Promise((resolve, _reject) => {
        setTimeout(resolve, ms);
    });
};

const main = async () => {
    const spike = new Spike({
        spike: {
            url: 'https://51.144.178.121:1337',
            clientId: '9FXuQkn7m7YNjecKufGAQV2HR_Lcu7PDNhNf31Od',
            clientSecret: 'GxE6OodYjrFNdSwe4tI3zJJ5OhbNpgMc8toWyPKJ~OfkR_f21eCDyCi8CN~l709uYBLfdiYWiF8ryjlRZ_cTap108wmSMaWXdZn5',
        },
        redis: {
            uri: 'redis://localhost',
        },
    });

    await spike.initialize();

    let seconds = 0;
    for (;;) {
        const { result: token, err } = await trycatch(() => spike.getToken('phonebook'));
        if (err) {
            console.error(`Get token failed with error: `, err);
        } else {
            console.log(`Token after ${seconds++} seconds:`, token);
        }

        await sleep(1000);
    }
};

main().catch((err) => {
    console.error(`Main failed with error:`, err);
});
