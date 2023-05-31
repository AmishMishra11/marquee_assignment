export type User = {
  id: number;
  userName: string;
  password: string;
};

export const listedUsers: User[] = [
  {
    id: 1,
    userName: "guest",
    password: "password",
  },
  { id: 2, userName: "amish", password: "mishra" },
];
