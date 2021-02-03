/* istanbul ignore file */
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export class FakeAxiosError extends Error implements AxiosError {
    public config: AxiosRequestConfig;
    public request?: any;
    public response?: AxiosResponse;
    public isAxiosError: boolean = true;
    public name: string;

    constructor(public message: string, public code: string, status?: number) {
        super(message);

        if (status) {
            this.response = { status, data: {}, statusText: message, config: {}, headers: {} };
        }
    }

    toJSON() {
        return { code: this.code };
    }
}
