import { injectable } from 'tsyringe';

import { Command } from './Command';

import { SupportedEnvironments } from '@core/types/Environments';
import { type CommandPayload } from '@core/types/FigmaUIMessage';

export interface DrawRectanglesPayload extends CommandPayload {
  count: number;
}

@injectable()
export class FigmaDrawRectangles implements Command<DrawRectanglesPayload> {
  type = 'DrawRectangles';

  supportedEnvironments = [SupportedEnvironments.FIGMA];

  execute(figma: PluginAPI, payload: DrawRectanglesPayload): void {
    const nodes: SceneNode[] = Array(payload.count)
      .fill(0)
      .map((_, i) => {
        const rect = figma.createRectangle();
        rect.x = i * 150;
        rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
        return rect;
      });

    nodes.forEach((node) => {
      figma.currentPage.appendChild(node);
    });

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    figma.closePlugin();
  }

  validatePayload(payload: DrawRectanglesPayload): boolean {
    return typeof payload.count === 'number';
  }
}
