# `figma-plugin-react-template`

> A template for building Figma plugins with React and Typescript

## Getting started

1. Create a new repository from this template
2. Clone the repository
3. Install dependencies with `yarn`
4. Change the `name` and `id` in `manifest.json`
5. Start to building plugin with `yarn watch`
6. Open Figma and create new file
7. Click `Plugins > Development > Import from manifest...`
8. Select your `manifest.json` file

Before using this template, you should read the [Figma Plugin API documentation](https://www.figma.com/plugin-docs/intro/).

## About this template

### Supported Targets

This template supports both of `Figma Design` and `Figjam`.

You can change the target by editing `manifest.json`

### `vite`

This template uses [vite](https://vitejs.dev/) as a bundler.

### `src/core`

This directory contains the core logic of the plugin.

it has dependency injection with [tsyringe](https://github.com/microsoft/tsyringe).

If you want to add a new command, you should add a new file in `src/core/commands` directory like below.

```typescript
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
```

and register your command to `CommandsModule` in `src/core/commands/index.ts`.

```typescript
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
```

Done!
Then, you can use your command in `src/ui/commands/index.ts`.

```typescript
...
window.parent.postMessage({ pluginMessage: { type: 'DrawRectangles', payload: { count } } }, '*');
```

### `src/ui`

This directory contains the UI of the plugin.

It uses [react](https://reactjs.org/). with Typescript.

Also it uses [tailwindcss](https://tailwindcss.com/) for styling as default (You can change with what you want).

If you want to add UI components which looks like native Figma UI, see [`react-figma-plugin-ds`](https://www.npmjs.com/package/react-figma-plugin-ds) package.

you can build your custom UI in `src/ui/components` directory.

Check `src/ui/components/App.tsx` for example.

## Build

```bash
yarn build
```

## To-do

- [ ] Add tests
- [ ] Add more convenient way to use `window.parent.postMessage`
- [ ] Make `window.parent.postMessage` type-safe
