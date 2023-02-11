import { UserInfoUpdatable, UserModel } from "./user.interfaces";

export interface UserRepository {
  findUserById(id: string): Promise<UserModel | null>;
  findUserByUsername(username: string): Promise<UserModel | null>;
  existsOne(user: UserModel): Promise<UserModel | null>;
  createUser(user: UserModel): Promise<UserModel>;
  updateUser(user: UserInfoUpdatable): Promise<UserModel>;
  deleteUser(id: string): Promise<void>;
}