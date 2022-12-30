import { Inject } from "@nestjs/common";
import { Client } from "@temporalio/client";


export class TemporalService {
    constructor(@Inject('client') public client: Client) {}
}
