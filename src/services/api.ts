import axios from 'axios';

const api = axios.create({
  baseURL: 'http://cbank-api.leduardo.dev/',
});

interface User {
  fname: string;
  lname: string;
  email: string;
  cpf: string;
}

const signUp = async (
  userData: User & { password: string },
): Promise<User | undefined> => {
  try {
    const { data }: { data: User } = await api.post('/user', userData);

    return data;
  } catch (error) {
    return undefined;
  }
};

interface SignInResponse {
  f_name: string;
  l_name: string;
  email: string;
  cpf: string;
  token: string;
}

const signIn = async (userCredentials: {
  email: string;
  password: string;
}): Promise<SignInResponse | undefined> => {
  try {
    const { data }: { data: SignInResponse } = await api.post(
      '/user/session',
      userCredentials,
    );

    return data;
  } catch (error) {
    return undefined;
  }
};

interface GetUserBalanceResponse {
  balance: number;
}

const getUserBalance = async (
  token: string,
): Promise<GetUserBalanceResponse | undefined> => {
  try {
    const { data }: { data: GetUserBalanceResponse } = await api.get(
      '/user/verify/balance',
      {
        headers: {
          Authorization: `jwt ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    return undefined;
  }
};

interface DepositValueResponse {
  balance: number;
}

const depositValue = async (
  token: string,
  value: number,
): Promise<DepositValueResponse | undefined> => {
  try {
    const { data }: { data: DepositValueResponse } = await api.put(
      '/user/deposit',
      {
        value,
      },
      {
        headers: {
          Authorization: `jwt ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    return undefined;
  }
};

interface WithdrawValueResponse {
  balance: number;
}

const withdrawValue = async (
  token: string,
  value: number,
): Promise<WithdrawValueResponse | undefined> => {
  try {
    const { data }: { data: WithdrawValueResponse } = await api.post(
      '/user/withdraw',
      {
        value,
      },
      {
        headers: {
          Authorization: `jwt ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    return undefined;
  }
};

interface TransferValueResponse {
  balance_send: number;
}

const transferValue = async (
  token: string,
  value: number,
  cpf: string,
): Promise<TransferValueResponse | undefined> => {
  try {
    const { data }: { data: TransferValueResponse } = await api.post(
      '/user/transfer',
      {
        cpf,
        value,
      },
      {
        headers: {
          Authorization: `jwt ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    return undefined;
  }
};

interface GetHistoryResponse {
  id: number;
  type: number;
  value: number;
  cpf_send: string;
  send_user: string;
  time: Date;
}

const getHistory = async (
  token: string,
): Promise<GetHistoryResponse[] | undefined> => {
  try {
    const { data }: { data: GetHistoryResponse[] } = await api.get(
      '/user/verify/history',
      {
        headers: {
          Authorization: `jwt ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    return undefined;
  }
};

export {
  signUp,
  signIn,
  getUserBalance,
  depositValue,
  withdrawValue,
  transferValue,
  getHistory,
};
