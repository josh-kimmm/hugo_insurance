import type { Models } from "../db"
import type { IError } from "./error";

interface IApplicationResponse extends IError {
  user?: InstanceType<Models["User"]> | null;
  address?: InstanceType<Models["Address"]> | null;
  vehicles?: InstanceType<Models["Vehicle"]>[] | null;
  currentStep?: string
};


export {
  IApplicationResponse
}