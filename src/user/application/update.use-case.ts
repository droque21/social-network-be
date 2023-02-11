import { User } from "../domain/user.entity";
import { UserRepository } from "../domain/user.respository";

export class UserUpdate {

  constructor(private userRepository: UserRepository) { }

  async run(user: User) {
    return this.userRepository.updateUser(user);
  }
}