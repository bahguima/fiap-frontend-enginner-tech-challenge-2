import type * as React from "react";

import type { Transaction } from "@/api/contracts";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

export type TransactionDialog = "create" | "details" | "edit" | "delete" | null;

export interface TransactionDialogsState {
  dialog: TransactionDialog;
  selectedTransaction: Transaction | null;
  openCreate: () => void;
  openDetails: (transaction: Transaction) => void;
  openEdit: (transaction: Transaction) => void;
  openDelete: (transaction: Transaction) => void;
  closeDialog: () => void;
}

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

export interface ToastActionTypes {
  ADD_TOAST: "ADD_TOAST";
  UPDATE_TOAST: "UPDATE_TOAST";
  DISMISS_TOAST: "DISMISS_TOAST";
  REMOVE_TOAST: "REMOVE_TOAST";
}

export type ToastAction =
  | {
      type: ToastActionTypes["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ToastActionTypes["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ToastActionTypes["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ToastActionTypes["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

export interface ToastState {
  toasts: ToasterToast[];
}

export type Toast = Omit<ToasterToast, "id">;
