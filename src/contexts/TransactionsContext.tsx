import { createContext, ReactNode, useEffect, useState } from "react";
import { transactionApi } from "../services/transaction";

interface ITransaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface ITransactionContextTypes {
  transactions: ITransaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInout) => Promise<void>;
}

interface ITransactionProvider {
  children: ReactNode;
}

interface CreateTransactionInout {
  category: string;
  description: string;
  type: "income" | "outcome";
  price: number;
}

export const TransactionContext = createContext({} as ITransactionContextTypes);

export function TransactionProvider({ children }: ITransactionProvider) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  // async function fetchTransactions(query?: string) {
  //   const url = new URL("http://192.168.15.9:3333/transactions");

  //   if (query) {
  //     url.searchParams.append("q", query);
  //   }

  //   const response = await fetch(url);
  //   const data = await response.json();
  //   setTransactions(data);
  // }

  async function fetchTransactions(query?: string) {
    const response = await transactionApi.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setTransactions(response.data);
  }

  async function createTransaction(data: CreateTransactionInout) {
    const { category, description, type, price } = data;

    const response = await transactionApi.post("transactions", {
      category,
      description,
      type,
      price,
      createdAt: new Date(),
    });

    setTransactions((state) => [...state, response.data]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
