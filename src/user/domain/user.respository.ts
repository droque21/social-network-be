import { User } from "./user.entity";

export interface UserRepository {
  findUserById(id: string): Promise<User>;
  findUserByUsername(username: string): Promise<User>;
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
}