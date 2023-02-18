import { Request, Response, NextFunction } from "express"
import { JsonWebToken } from "../json_web_token"

type CurretUser = { id: string }

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurretUser
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = JsonWebToken.decrypt(token) as CurretUser
    req.currentUser = payload
  } catch (error) {
  }

  next()
}
