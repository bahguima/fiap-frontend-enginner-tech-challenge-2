"use client";

import { useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@banking/shared/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@banking/shared/ui/components/dialog";
import { Input } from "@banking/shared/ui/components/input";
import { Label } from "@banking/shared/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@banking/shared/ui/components/select";
import type { ITransactionFormModalProps } from "./interface";
import {
  getDefaultTransactionFormValues,
  transactionCategoryOptions,
  transactionFormSchema,
  transactionStatusOptions,
  transactionTypeOptions,
  type TransactionFormValues,
} from "./schema";
import { Field, FieldError, Form, FormGrid } from "./styled";

export function TransactionFormModal({
  "data-testid": dataTestId,
  mode,
  open,
  transaction,
  onOpenChange,
  onSubmit,
  errorMessage,
  isSubmitting = false,
}: ITransactionFormModalProps) {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: getDefaultTransactionFormValues(),
  });

  useEffect(() => {
    if (!open) return;

    form.reset(
      mode === "edit" && transaction
        ? transaction.editableFields
        : getDefaultTransactionFormValues(),
    );
  }, [form, mode, open, transaction]);

  const handleSubmit: SubmitHandler<TransactionFormValues> = (values) => {
    onSubmit(values);
  };

  const title = mode === "create" ? "Nova Transação" : "Editar Transação";
  const actionLabel = mode === "create" ? "Criar" : "Salvar";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid={dataTestId} aria-busy={isSubmitting}>
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

          {errorMessage && <FieldError role="alert">{errorMessage}</FieldError>}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {actionLabel}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
