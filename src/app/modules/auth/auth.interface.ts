type TUserName = {
  userName: string;
};
type TUserEmail = {
  email: string;
};

export type TAuth = {
  loginId: TUserName | TUserEmail;
  password: string;
};
