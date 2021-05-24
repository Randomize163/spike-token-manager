export * from './event';
export * from './limiter';

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
