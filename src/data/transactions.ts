import type { MonthlyTransactionData, Transaction } from "./interface";

export type { MonthlyTransactionData, Transaction } from "./interface";

export const transactions: Transaction[] = [
  { id: "1", description: "Salary Deposit", amount: 8500, type: "income", category: "Salary", date: "2026-04-10", status: "completed" },
  { id: "2", description: "Netflix Subscription", amount: -15.99, type: "expense", category: "Entertainment", date: "2026-04-09", status: "completed" },
  { id: "3", description: "Grocery Store", amount: -127.43, type: "expense", category: "Food & Drink", date: "2026-04-08", status: "completed" },
  { id: "4", description: "Freelance Payment", amount: 2200, type: "income", category: "Freelance", date: "2026-04-07", status: "completed" },
  { id: "5", description: "Electric Bill", amount: -89.50, type: "expense", category: "Utilities", date: "2026-04-06", status: "completed" },
  { id: "6", description: "Restaurant Dinner", amount: -62.00, type: "expense", category: "Food & Drink", date: "2026-04-05", status: "completed" },
  { id: "7", description: "Stock Dividend", amount: 340, type: "income", category: "Investments", date: "2026-04-04", status: "completed" },
  { id: "8", description: "Uber Ride", amount: -24.30, type: "expense", category: "Transport", date: "2026-04-03", status: "completed" },
  { id: "9", description: "Client Invoice #402", amount: 4800, type: "income", category: "Freelance", date: "2026-04-02", status: "pending" },
  { id: "10", description: "Health Insurance", amount: -320, type: "expense", category: "Insurance", date: "2026-04-01", status: "completed" },
  { id: "11", description: "Gym Membership", amount: -49.99, type: "expense", category: "Health", date: "2026-03-31", status: "completed" },
  { id: "12", description: "Interest Income", amount: 128.50, type: "income", category: "Investments", date: "2026-03-30", status: "completed" },
  { id: "13", description: "Amazon Purchase", amount: -89.99, type: "expense", category: "Shopping", date: "2026-03-29", status: "completed" },
  { id: "14", description: "Rent Payment", amount: -1800, type: "expense", category: "Housing", date: "2026-03-28", status: "completed" },
  { id: "15", description: "Bonus Payment", amount: 1500, type: "income", category: "Salary", date: "2026-03-27", status: "completed" },
];

export const monthlyData: MonthlyTransactionData[] = [
  { month: "Nov", income: 12400, expense: 8200 },
  { month: "Dec", income: 14200, expense: 9100 },
  { month: "Jan", income: 11800, expense: 7800 },
  { month: "Feb", income: 13500, expense: 8900 },
  { month: "Mar", income: 15840, expense: 9200 },
  { month: "Apr", income: 17468, expense: 2579 },
];
