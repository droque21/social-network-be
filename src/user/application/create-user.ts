import { User } from "../domain/user.entity";
import { UserRepository } from "../domain/user.respository";

export class UserCreator {

  constructor(private userRepository: UserRepository) { }

  async run(user: User) {
    const existingUser = await this.userRepository.findUserByUsername(user.username);
    if (existingUser) {
      throw new Error(`User with username ${user.username} already exists`);
    }

    return this.userRepository.createUser(user);
  }
}