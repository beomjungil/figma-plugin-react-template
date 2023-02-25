import { SupportedEnvironments } from '@core/types/Environments';
import { CommandPayload } from '@core/types/FigmaUIMessage';

export interface Command<Payload extends CommandPayload = CommandPayload> {
  type: string;
  supportedEnvironments: SupportedEnvironments[];
  execute(figma: PluginAPI, payload: Payload): void;
  validatePayload?: (payload: Payload) => boolean;
}
