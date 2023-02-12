import { ResponseJson } from "./responseJson";

export class AppResponse implements ResponseJson {

  readonly message: string;
  readonly success: boolean;
  readonly data: any;

  constructor({
    message,
    success,
    data,
  }: ResponseJson) {
    this.message = message;
    this.success = success;
    this.data = data;
  }

}