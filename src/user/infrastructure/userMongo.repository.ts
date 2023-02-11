import { User } from "../domain/user.entity";
import { UserInfoUpdatable } from "../domain/user.interfaces";
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

  async updateUser({ firstName, lastName, id }: UserInfoUpdatable) {
    const userFound = await this.findUserById(id);

    if (!userFound) {
      throw new Error('User not found');
    }

    const userUpdated = userFound.set({
      firstName,
      lastName,
      updatedAt: Date.now()
    });

    await userUpdated.save();

    return userUpdated;
  }

  async deleteUser(id: string) {
    await UserModel.findOneAndUpdate({ id }, { isActive: false, updatedAt: Date.now() })
  }
}