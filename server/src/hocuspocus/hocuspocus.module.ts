import { DynamicModule, Module } from '@nestjs/common'
import { HocuspocusGateway } from './hocuspocus.gateway'

export const HocuspocusKey = 'Hocuspocus'

@Module({})
export class HocuspocusModule {
  static async registerAsync({
    useFactory,
    imports,
    inject,
  }): Promise<DynamicModule> {
    const hocuspocusProvider = {
      provide: HocuspocusKey,
      useFactory: async (...args) => {
        return
      },
      inject,
    }

    return {
      module: HocuspocusModule,
      imports,
      providers: [hocuspocusProvider, HocuspocusGateway],
      exports: [hocuspocusProvider, HocuspocusGateway],
    }
  }
}
