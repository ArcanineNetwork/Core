import { Controller, Get } from '@nestjs/common';
import { example } from './workflows';
import { TemporalService } from "./temporal.service";

@Controller()
export class TemporalController {
    constructor(private temporal: TemporalService) {}

    @Get('doit')
    async getHello(): Promise<string> {

        const handle = await this.temporal.client.workflow.start(example, {
            // type inference works! args: [name: string]
            args: ['Temporal'],
            taskQueue: 'hello-world',
            // in practice, use a meaningful business id, eg customerId or transactionId
            workflowId: 'workflow-',
        });

        console.log(`Started workflow ${handle.workflowId}`);

        // optional: wait for client result
        const response = await handle.result();
        console.log(response); // Hello, Temporal!

        return response;
    }
}