"use client";

import { useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getDefaultTransactionFormValues,
  getTransactionFormValues,
} from "@/lib/transactions";

import type { ITransactionFormModalProps } from "./interface";
import {
  transactionCategoryOptions,
  transactionFormSchema,
  transactionStatusOptions,
  transactionTypeOptions,
  type TransactionFormValues,
} from "./schema";
import { Field, FieldError, Form, FormGrid } from "./styled";

export function TransactionFormModal({
  mode,
  open,
  transaction,
  onOpenChange,
  onSubmit,
}: ITransactionFormModalProps) {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: getDefaultTransactionFormValues(),
  });

  useEffect(() => {
    if (!open) return;

    form.reset(
      mode === "edit" && transaction
        ? getTransactionFormValues(transaction)
        : getDefaultTransactionFormValues(),
    );
  }, [form, mode, open, transaction]);

  const handleSubmit: SubmitHandler<TransactionFormValues> = (values) => {
    onSubmit(values);
    onOpenChange(false);
  };

  const title = mode === "create" ? "Nova Transação" : "Editar Transação";
  const actionLabel = mode === "create" ? "Criar" : "Salvar";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Preencha os dados abaixo.</DialogDescription>
        </DialogHeader>

        <Form onSubmit={form.handleSubmit(handleSubmit)}>
          <Field>
            <Label htmlFor={`${mode}-transaction-description`}>Descrição</Label>
            <Input
              id={`${mode}-transaction-description`}
              placeholder="Ex: Pagamento de aluguel"
              {...form.register("description")}
            />
            <FieldError>
              {form.formState.errors.description?.message}
            </FieldError>
          </Field>

          <FormGrid>
            <Field>
              <Label>Tipo</Label>
              <Controller
                control={form.control}
                name="type"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger aria-label="Tipo">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {transactionTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError>{form.formState.errors.type?.message}</FieldError>
            </Field>

            <Field>
              <Label>Categoria</Label>
              <Controller
                control={form.control}
                name="category"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger aria-label="Categoria">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {transactionCategoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError>{form.formState.errors.category?.message}</FieldError>
            </Field>
          </FormGrid>

          <FormGrid>
            <Field>
              <Label htmlFor={`${mode}-transaction-amount`}>Valor</Label>
              <Input
                id={`${mode}-transaction-amount`}
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                {...form.register("amount")}
              />
              <FieldError>{form.formState.errors.amount?.message}</FieldError>
            </Field>

            <Field>
              <Label htmlFor={`${mode}-transaction-date`}>Data</Label>
              <Input
                id={`${mode}-transaction-date`}
                type="date"
                {...form.register("date")}
              />
              <FieldError>{form.formState.errors.date?.message}</FieldError>
            </Field>
          </FormGrid>

          <Field>
            <Label>Status</Label>
            <Controller
              control={form.control}
              name="status"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger aria-label="Status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError>{form.formState.errors.status?.message}</FieldError>
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">{actionLabel}</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
