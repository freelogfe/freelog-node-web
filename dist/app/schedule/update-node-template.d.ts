import { Context } from 'midway';
declare const _default: {
    schedule: {
        interval: string;
        type: string;
        immediate: boolean;
    };
    task(ctx: Context): Promise<void>;
};
export default _default;
