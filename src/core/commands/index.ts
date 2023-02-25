import { registry } from 'tsyringe';

import { FigjamDrawRectangles } from './FigjamDrawRectangles';
import { FigmaDrawRectangles } from './FigmaDrawRectangles';

@registry([
  { token: CommandsModule.token, useToken: FigmaDrawRectangles },
  { token: CommandsModule.token, useToken: FigjamDrawRectangles },
])
export abstract class CommandsModule {
  static readonly token = Symbol('Commands');
}
