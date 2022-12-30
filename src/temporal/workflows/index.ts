import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { greet, goodbye, capitalize } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
    const largeName = await capitalize(name);
    const greeting = await greet(largeName);
    const farewell = await goodbye(largeName);

    return `${greeting} ... ${farewell}`;
}