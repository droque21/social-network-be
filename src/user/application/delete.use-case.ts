import { User } from "../domain/user.entity";
import { UserRepository } from "../domain/user.respository";

export class UserDelete {

  constructor(private userRepository: UserRepository) { }

  async run(id: string) {
    return this.userRepository.deleteUser(id);
  }
}