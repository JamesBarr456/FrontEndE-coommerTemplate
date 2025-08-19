import { ILogin, IRegister, IUser } from "@/interfaces/users";

import { userMock } from "@/const/user/user-mock.product";

// simulamos un token fijo
const fakeToken = "FAKE_TOKEN_123456";

export const registerUser = async (newUser: IRegister) => {
  const exists = userMock.find((u) => u.email === newUser.email);
  if (exists) throw new Error("User already exists");

  const createdUser: IUser = {
    ...newUser,
    _id: (userMock.length + 1).toString(),
    status: "user",
    avatar: "",
    created_at: new Date(),
    updated_at: new Date(),
  };

  userMock.push(createdUser);
  return createdUser;
};

export const loginUser = async (user: ILogin) => {
  const found = userMock.find(
    (u) => u.email === user.email && u.password === user.password
  );
  if (!found) throw new Error("Invalid credentials");

  return { data: found, token: fakeToken };
};

export const getUsers = async () => {
  return userMock;
};

export const deleteUser = async (id: string) => {
  const index = userMock.findIndex((u) => u._id === id);
  if (index === -1) throw new Error("User not found");

  const deleted = userMock.splice(index, 1);
  return deleted[0];
};

export const putUser = async (id: string, data: Partial<IUser>) => {
  const user = userMock.find((u) => u._id === id);
  if (!user) throw new Error("User not found");

  Object.assign(user, data);
  return user;
};

export const putPasswordUser = async (
  id: string,
  data: { currentPassword: string; newPassword: string }
) => {
  const user = userMock.find((u) => u._id === id);
  if (!user) throw new Error("User not found");

  if (user.password !== data.currentPassword) {
    throw new Error("Current password is incorrect");
  }

  user.password = data.newPassword;
  return user;
};
