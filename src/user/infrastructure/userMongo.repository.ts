import { User } from "../domain/user.entity";
import { UserRepository } from "../domain/user.respository";
import { UserModel } from "./user.mongo";

export class UserMongoRepository implements UserRepository {
  async findUserById(id: string) {
    const user = await UserModel.findOne({ id });
    return user;
  }

  async findUserByUsername(username: string) {
    const user = await UserModel.findOne({ username });
    return user;
  }

  async createUser(user: User) {
    const userCreated = UserModel.build(user);
    await userCreated.save();

    return userCreated
  }

  updateUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  deleteUser(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}