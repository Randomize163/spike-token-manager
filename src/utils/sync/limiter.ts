/* eslint-disable max-classes-per-file */
import { trycatch } from '..';
import Event from './event';

class Job<T> {
    public event = new Event();
    public result?: T = undefined;
    public err?: Error;
}

export default class DoOnce {
    private jobs = new Map<string, Job<any>>();

    public async run<T>(topic: string, job: () => T) {
        const runningJob = this.jobs.get(topic);
        if (runningJob) {
            await runningJob.event.wait();

            const { err, result } = runningJob;

            if (err) {
                throw err;
            }

            return result;
        }

        const newJob = new Job<T>();
        this.jobs.set(topic, newJob);

        const { result, err } = await trycatch(job);

        newJob.result = result;
        newJob.err = err;

        newJob.event.signal();

        this.jobs.delete(topic);

        if (err) {
            throw err;
        }

        return newJob.result;
    }
}
