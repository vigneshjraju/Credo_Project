import { Agent, InitConfig, ConsoleLogger, LogLevel, ConnectionsModule } from '@credo-ts/core';
import { agentDependencies } from '@credo-ts/react-native';
import { AskarModule } from '@credo-ts/askar';
import { ariesAskar } from '@hyperledger/aries-askar-react-native';

console.log('Checking credo TS dependencies.');
console.log('Agent:', typeof Agent);
console.log('agentDependencies:', agentDependencies ? ' Loaded' : ' Missing');
console.log('AskarModule:', typeof AskarModule);
console.log('ariesAskar:', ariesAskar ? ' Loaded' : ' Missing');


class MobileBobAgent {
  private agent: Agent | null = null;
  private isInitialized = false;

  async initializeAgent(): Promise<boolean> {
    try {
      console.log('Starting Bob Agent initialization...');
      
      if(!agentDependencies){
        throw new Error('gentDependencies is undefined - Credo TS React Native not properly installed')
      }

      if(!ariesAskar){
        throw new Error('ariesAskar is undefined - Aries Askar React Native not properly installed');
      }

      console.log(' Dependencies verified, creating config...');

      const config: InitConfig = {
        label: 'Mobile-Bob-Agent',
        walletConfig: {
          id: 'mobile-bob-wallet',
          key: 'mobilebobagentkey00000000000000000',
        },
        logger: new ConsoleLogger(LogLevel.info),
      };

      console.log(' Creating agent configuration...');
      
      this.agent = new Agent({
        config,
        dependencies: agentDependencies,
        modules: {
          askar: new AskarModule({ ariesAskar }),
          connections: new ConnectionsModule({
            autoAcceptConnections: true,
          }),
        },
      });

      console.log(' Initializing agent...');
      await this.agent.initialize();
      
      this.isInitialized = true;
      console.log(' Bob Agent initialized successfully!');
      return true;
      
    } catch (error) {
      console.error(' Failed to initialize Bob Agent:', error);
      return false;
    }
  }

  getAgent(): Agent {
    if (!this.agent || !this.isInitialized) {
      throw new Error('Agent not initialized. Call initializeAgent() first.');
    }
    return this.agent;
  }

  getIsInitialized(): boolean {
    return this.isInitialized;
  }

  getAgentInfo() {
    if (!this.isInitialized) {
      return { initialized: false, label: 'Not initialized' };
    }
    return {
      initialized: true,
      label: 'Mobile-Bob-Agent',
      walletId: 'mobile-bob-wallet'
    };
  }
}

export const mobileBobAgent = new MobileBobAgent();