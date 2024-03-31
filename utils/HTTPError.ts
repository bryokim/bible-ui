/**
 * Custom HTTPError class
 */
export default class HTTPError extends Error {
  detail?: string;
  statusCode?: string;

  constructor(err: { message: string; status?: string; data: any }) {
    const { message, status, data } = err;

    super(message);
    this.detail = data.detail;
    this.statusCode = status;
  }
}
