import { injectAll, singleton } from 'tsyringe';

import { SupportedEnvironments } from '@core/types/Environments';
import { CommandsModule } from '@core/commands';
import { Command } from '@core/commands/Command';
import { FigmaUIMessage } from '@core/types/FigmaUIMessage';

@singleton()
export class FigmaPlugin {
  private figma: PluginAPI = figma;

  private commands: Command[];

  constructor(@injectAll(CommandsModule.token) commands: Command[]) {
    this.commands = commands;
  }

  start(options: ShowUIOptions = {}): void {
    this.figma.showUI(__html__, options);
    this.figma.ui.onmessage = (message) => {
      this.handleMessage(message as unknown as FigmaUIMessage);
    };
  }

  private handleMessage(message: FigmaUIMessage) {
    const command = this.commands.find(({ type, supportedEnvironments }) => {
      return message.type === type && supportedEnvironments.includes(figma.editorType as SupportedEnvironments);
    });

    if (!command) {
      this.figma.notify(`Can't execute ${message.type}: command not found`, { error: true });
      return;
    }

    if (command.validatePayload && !command.validatePayload(message.payload)) {
      this.figma.notify(`Can't execute ${command.type}: invalid payload`, {
        error: true,
        button: {
          text: 'Submit a bug report',
          action: () => {
            const url = 'https://example.com';
            const openLinkUIString = `<script>window.open('${url}','_blank');</script>`;

            figma.showUI(openLinkUIString, { visible: false });
            setTimeout(figma.closePlugin, 1000);
          },
        },
      });
      return;
    }

    command.execute(figma, message.payload);
  }
}
