import { Module, DynamicModule } from '@nestjs/common';
import { TemporalController } from "./temporal.controller";
import { TemporalService } from "./temporal.service";
import {Client, Connection} from "@temporalio/client";

@Module({
    controllers: [TemporalController],
    providers: [TemporalService],
    exports: [TemporalService]
})
export class TemporalModule {
    static register(): DynamicModule {
        return {
            module: TemporalModule,
            controllers: [TemporalController],
            providers: [
                TemporalService,
                {
                    provide: 'client',
                    useFactory: async () => {
                        const connection = await Connection.connect();
                        // In production, pass options to configure TLS and other settings:
                        // {
                        //   address: 'foo.bar.tmprl.cloud',
                        //   tls: {}
                        // }

                        return new Client({
                            connection,
                            // namespace: 'foo.bar', // connects to 'default' namespace if not specified
                        });
                    }
                }
            ],
        }
    }
}