import { v4 as uuid, validate } from "uuid";

export const generateUuid = () => uuid();
export const validateUuid = (id: string) => validate(id);