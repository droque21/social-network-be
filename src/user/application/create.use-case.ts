import { PasswordEncrypter } from "../../shared/infrastructure/passwordEncrypter/passwordEncrypter";
import { User } from "../domain/user.entity";
import { UserModel } from "../domain/user.interfaces";
import { UserRepository } from "../domain/user.respository";

export class UserCreator {

  constructor(private userRepository: UserRepository) { }

  async run(user: UserModel) {

    const existingUser = await this.userRepository.existsOne(user);

    if (existingUser) {
      if (existingUser.id === user.id) {
        throw new Error(`User with id ${user.id} already exists`);
      }
      else if (existingUser.email === user.email) {
        throw new Error(`User with email ${user.email} already exists`);
      }
      else if (existingUser.username === user.username) {
        throw new Error(`User with username ${user.username} already exists`);
      }
    }

    const passwordEncrypter = new PasswordEncrypter();
    const passwordEncrypted = await passwordEncrypter.encrypt(user.password);

    const newUser = new User({
      ...user,
      password: passwordEncrypted,
    })

    return this.userRepository.createUser(newUser);
  }
}