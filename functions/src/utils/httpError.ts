export default class HTTPError extends Error {
  statusCode?: number;
  publicMessage?: string | undefined;
  constructor(
    input: {
      statusCode?: number;
      message?: string;
      publicMessage?: string;
    } = {}
  ) {
    const message = input.message || input.publicMessage;
    super(message);
    this.statusCode = input.statusCode;
    this.publicMessage = input.publicMessage;
  }
}
