import { container } from 'tsyringe';

import { FigmaPlugin } from './base/Plugin';

const plugin = container.resolve(FigmaPlugin);

plugin.start({
  title: 'Demo',
  width: 600,
  height: 400,
});
