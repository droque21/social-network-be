import { JsonWebToken } from "../../shared/infrastructure/jsonWebToken/jsonWebToken";
import { PasswordEncrypter } from "../../shared/infrastructure/passwordEncrypter/passwordEncrypter";
import { UserRepository } from "../../user/domain/user.respository";

export class LoginUseCase {

  constructor(private userRepository: UserRepository) { }

  async run(username: string, password: string) {
    const user = await this.userRepository.findUserByUsername(username);

    if (!user) {
      throw new Error('Username or password incorrect');
    }


    const passwordEncrypter = new PasswordEncrypter();
    const passwordValid = await passwordEncrypter.compare(password, user.password!);

    if (!passwordValid) {
      throw new Error('Username or password incorrect');
    }

    const jsonWebToken = new JsonWebToken();

    const auth = jsonWebToken.encrypt(user.id);

    return auth
  }
}