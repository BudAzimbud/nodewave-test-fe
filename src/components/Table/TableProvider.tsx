import React, { createContext, useContext, useState } from "react";

type TableCtx = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>
};

export const TableFilterContext = createContext<TableCtx>({
  page: 1,
  setPage: () => {}
});

type TableProviderProps = {
  children: React.ReactNode;
};

export const TableProvider: React.FC<TableProviderProps> = ({
  children,
}) => {
  const [page, setPage] = useState<number>(0);

  return (
    <TableFilterContext.Provider
      value={{
        page,
        setPage
      }}
    >
      {children}
    </TableFilterContext.Provider>
  );
};

export const useTableFilter = () => useContext(TableFilterContext);
