export interface UserInfoUpdatable {
  id: string;
  firstName: string;
  lastName: string;
}

export interface UserModel extends UserInfoUpdatable {
  username: string;
  password: string;
  email: string;
}  