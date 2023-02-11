import { UserInfoUpdatable } from "../domain/user.interfaces";
import { UserRepository } from "../domain/user.respository";

export class UserUpdate {

  constructor(private userRepository: UserRepository) { }

  async run(user: UserInfoUpdatable) {
    return this.userRepository.updateUser(user);
  }
}