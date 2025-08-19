export type UserStatus = "admin" | "user";
export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  first_name: string;
  last_name: string;
  dni: string;
  number_phone: string;
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  dni: string;
  number_phone: string;
  email: string;
  password: string;
  avatar: string;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
}
