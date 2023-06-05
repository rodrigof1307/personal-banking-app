import {createContext} from 'react';

/* Holds the current logged in user */
export const UserContext = createContext<{
  user: UserAccount | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserAccount | undefined>>;
}>({} as any);
