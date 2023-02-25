import { injectable } from 'tsyringe';

import { Command } from './Command';

import { SupportedEnvironments } from '@core/types/Environments';
import { type CommandPayload } from '@core/types/FigmaUIMessage';

export interface DrawRectanglesPayload extends CommandPayload {
  count: number;
}

@injectable()
export class FigjamDrawRectangles implements Command<DrawRectanglesPayload> {
  type = 'DrawRectangles';

  supportedEnvironments = [SupportedEnvironments.FIGJAM];

  execute(figma: PluginAPI, payload: DrawRectanglesPayload): void {
    const nodes: SceneNode[] = Array(payload.count)
      .fill(0)
      .map((_, i) => {
        const shape = figma.createShapeWithText();
        shape.shapeType = 'ROUNDED_RECTANGLE';
        shape.x = i * (shape.width + 200);
        shape.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
        return shape;
      });

    nodes.forEach((node) => {
      figma.currentPage.appendChild(node);
    });

    nodes.forEach((node, i) => {
      const connector = figma.createConnector();
      connector.strokeWeight = 8;

      connector.connectorStart = {
        endpointNodeId: node.id,
        magnet: 'AUTO',
      };

      if (nodes[i + 1]?.id) {
        connector.connectorEnd = {
          endpointNodeId: nodes[i + 1].id,
          magnet: 'AUTO',
        };
      }

      return connector;
    });

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    figma.closePlugin();
  }

  validatePayload(payload: DrawRectanglesPayload): boolean {
    return typeof payload.count === 'number';
  }
}
