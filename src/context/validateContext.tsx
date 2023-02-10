import {
  createContext,
  type SetStateAction,
  type Dispatch,
  type ReactElement,
  useState,
  useContext,
} from "react";

interface invalidUrl {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
}

const ContextinvalidUrl = createContext<invalidUrl>({
  value: false,
  setValue: (value) => value,
});

export const ContextInvalidUrlProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [value, setValue] = useState(false);

  return (
    <ContextinvalidUrl.Provider value={{ value, setValue }}>
      {children}
    </ContextinvalidUrl.Provider>
  );
};

// export const autoDownload = useContext(Auto)

export function useInvalidUrl(): [
  value: boolean,
  setValue: Dispatch<SetStateAction<boolean>>
] {
  const { value, setValue } = useContext(ContextinvalidUrl);

  return [value, setValue];
}

// import { createContext } from "vm";

// const context = createContext(false)

// export function contextProvider() {
//   return <div></div>;
// }
