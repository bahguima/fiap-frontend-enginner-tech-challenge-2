import type { ReactNode } from "react";

import type {
  ToastActionElement,
  ToastProps,
} from "../components/toast";

export type ToasterToast = ToastProps & {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
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
