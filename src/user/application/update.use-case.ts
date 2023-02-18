import { UserInfoUpdatable, UserRepository } from "../domain";
export class UserUpdate {

  constructor(private userRepository: UserRepository) { }

  async run(user: UserInfoUpdatable) {
    return this.userRepository.updateUser(user);
  }
}