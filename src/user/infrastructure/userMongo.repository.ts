import { User } from "../domain/user.entity";
import { UserRepository } from "../domain/user.respository";
import { UserModel } from "./user.mongo";

export class UserMongoRepository implements UserRepository {

  async existsOne(user: User) {
    const exists = await UserModel.findOne({
      $or: [
        { id: user.id },
        { username: user.username },
        { email: user.email }
      ]
    })

    return exists;
  }

  async findUserById(id: string) {
    const user = await UserModel.findOne({ id, isActive: true });
    return user;
  }

  async findUserByUsername(username: string) {
    const user = await UserModel.findOne({ username, isActive: true });
    return user;
  }

  async createUser(user: User) {
    const userCreated = UserModel.build(user);
    await userCreated.save();

    return userCreated
  }

  async updateUser(user: User) {
    const userFound = await this.findUserById(user.id);

    if (!userFound) {
      throw new Error('User not found');
    }

    const userUpdated = await UserModel.findOneAndUpdate({ id: user.id }, user);
    return userUpdated!;
  }

  async deleteUser(id: string) {
    UserModel.findOneAndUpdate({ id }, { isActive: false })
  }
}