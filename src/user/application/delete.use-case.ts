import { UserRepository } from "../domain";

export class UserDelete {

  constructor(private userRepository: UserRepository) { }

  async run(id: string) {
    return this.userRepository.deleteUser(id);
  }
}