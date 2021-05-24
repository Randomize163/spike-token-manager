import { sleep } from '../../utils';
import Event from '../../utils/sync/event';
import DoOnce from '../../utils/sync/limiter';

describe('Sync utils tests', () => {
    describe('Event tests', () => {
        it('should wait for event once', async () => {
            const event = new Event();

            let signaled = false;
            setTimeout(() => {
                signaled = true;
                event.signal();
            }, 0);

            await expect(event.wait()).resolves.toBeUndefined();
            expect(signaled).toBeTruthy();
        });

        it('should return if event was signaled', async () => {
            const event = new Event();

            let signaled = false;
            setTimeout(() => {
                signaled = true;
                event.signal();
            }, 0);

            await expect(event.wait()).resolves.toBeUndefined();
            expect(signaled).toBeTruthy();

            await expect(event.wait()).resolves.toBeUndefined();
        });

        it('should ignore double signal', async () => {
            const event = new Event();

            let signaled = false;
            setTimeout(() => {
                signaled = true;
                event.signal();
            }, 0);

            await expect(event.wait()).resolves.toBeUndefined();
            expect(signaled).toBeTruthy();

            event.signal();
            await expect(event.wait()).resolves.toBeUndefined();
        });

        it('should reset event', async () => {
            const event = new Event();

            let signaled = false;
            setTimeout(() => {
                signaled = true;
                event.signal();
            }, 0);

            await expect(event.wait()).resolves.toBeUndefined();
            expect(signaled).toBeTruthy();

            event.reset();
            signaled = false;

            setTimeout(() => {
                signaled = true;
                event.signal();
            }, 0);

            expect(signaled).toBeFalsy();
            await expect(event.wait()).resolves.toBeUndefined();
            expect(signaled).toBeTruthy();
        });
    });

    describe('DoOnce tests', () => {
        let doOnce: DoOnce;

        beforeEach(() => {
            doOnce = new DoOnce();
        });

        it('limit test', async () => {
            const result = 'res';
            let isInside = false;
            const job = jest.fn(async () => {
                expect(isInside).toBe(false);

                isInside = true;

                await sleep(Math.random() * 100);

                isInside = false;

                return result;
            });

            const topic = 'topic';
            const numberOfCallers = 50;

            const promises: Promise<void>[] = [];

            const singleCall = () => {
                return expect(doOnce.run(topic, job)).resolves.toEqual(result);
            };

            for (let i = 0; i < numberOfCallers; i++) {
                promises.push(singleCall());
            }

            await Promise.all(promises);

            expect(job).toHaveBeenCalledTimes(1);
        });

        it('throw test', async () => {
            const topic = 'topic';
            const error = new Error('Test error');

            const job = jest.fn(async () => {
                throw error;
            });

            const singleCall = () => {
                return expect(doOnce.run(topic, job)).rejects.toThrow(error);
            };

            const callers = 100;

            const promises: Promise<any>[] = [];
            for (let i = 0; i < callers; i++) {
                promises.push(singleCall());
            }

            await Promise.all(promises);

            expect(job).toHaveBeenCalledTimes(1);
        });

        it('should work with multiple topics', async () => {
            const topicsCount = 6;
            const jobs: jest.Mock<Promise<string>, []>[] = [];

            for (let i = 0; i < topicsCount; i++) {
                let count = 0;
                const job = jest.fn(async () => {
                    expect(count).toBe(0);

                    await sleep(10);

                    count++;

                    await sleep(10);

                    expect(count).toBe(1);

                    count--;

                    await sleep(10);

                    expect(count).toBe(0);

                    return `topic${i}`;
                });

                jobs.push(job);
            }

            const callersCount = 200;

            const promises: Promise<void>[] = [];

            const callerFn = (topic: string, job: () => {}) => {
                return expect(doOnce.run(topic, job)).resolves.toBe(topic);
            };

            for (let i = 0; i < callersCount; i++) {
                const jobIndex = i % topicsCount;
                const job = jobs[jobIndex];
                const expectedTopic = `topic${jobIndex}`;

                promises.push(callerFn(expectedTopic, job));
            }

            await Promise.all(promises);

            for (let i = 0; i < topicsCount; i++) {
                const job = jobs[i];

                expect(job).toHaveBeenCalledTimes(1);
            }
        });
    });
});
