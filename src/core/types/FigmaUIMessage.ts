export type CommandPayload = Record<string, unknown>;

export interface FigmaUIMessage<Type extends string = string, Payload extends CommandPayload = CommandPayload> {
  type: Type;
  payload: Payload;
}
