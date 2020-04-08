import { Injectable, OnModuleInit } from '@nestjs/common';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Logger } from '@nestjs/common';

const SUBSTRATE_URL = 'wss://dev-node.substrate.dev:9944';
// const SUBSTRATE_URL = 'ws://127.0.0.1:9944';

@Injectable()
export class AppService implements OnModuleInit {
  private api: ApiPromise;

  async onModuleInit() {
    Logger.log('Connecting to substrate chain...');
    const wsProvider = new WsProvider(SUBSTRATE_URL);
    this.api = await ApiPromise.create({ provider: wsProvider });
  }

  async getSimpleData() {
    await this.api.isReady;

    const chain = await this.api.rpc.system.chain();
    const nodeName = await this.api.rpc.system.name();
    const nodeVersion = await this.api.rpc.system.version();
    const header = await this.api.rpc.chain.getHeader();

    const ADDR = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
    const now = await this.api.query.timestamp.now();

    // depends of chain the different method will be used
    // const { data } = await this.api.query.system.account(ADDR);
    // const balance = data.free;
    // or this
    const balance = await this.api.query.balances.freeBalance(ADDR);

    return {
      chain,
      nodeName,
      nodeVersion,
      headerNumber: header.number,
      balance,
      now,
    };
  }
}
