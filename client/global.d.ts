type NavigationParamsList = {
  Login: undefined;
  Register: undefined;
  BottomTab: undefined;
  Deposit: undefined;
  Transfer: undefined;
  Home: undefined;
};

type UserAccount = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
};

type Transaction = {
  id: number;
  senderID: number | null;
  receiverID: number | null;
  receiverIBAN: string | null;
  status: TransactionStatus;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};
