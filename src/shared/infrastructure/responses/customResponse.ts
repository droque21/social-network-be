import { ResponseJson } from "./responseJson";

export class AppResponse implements ResponseJson {

  readonly message: string;
  readonly success: boolean;
  readonly result: any;

  constructor({
    message,
    success,
    result,
  }: ResponseJson) {
    this.message = message;
    this.success = success;
    this.result = result;
  }

}