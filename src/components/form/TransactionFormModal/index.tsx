"use client";

import { type ChangeEvent, useDeferredValue, useEffect, useState } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { useCategorySuggestionQuery } from "@/features/transactions/hooks";
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
import { Field, FieldError, FieldHint, Form, FormGrid } from "./styled";

export function TransactionFormModal({
  "data-testid": dataTestId,
  mode,
  open,
  transaction,
  onOpenChange,
  onSubmit,
}: ITransactionFormModalProps) {
  const { accessToken } = useAuth();
  const [attachment, setAttachment] = useState<File | null>(null);
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: getDefaultTransactionFormValues(),
  });
  const description = useDeferredValue(form.watch("description"));
  const type = form.watch("type");
  const suggestionQuery = useCategorySuggestionQuery(
    accessToken,
    { description, type },
    open && description.trim().length >= 3,
  );

  useEffect(() => {
    if (!open) return;

    form.reset(
      mode === "edit" && transaction
        ? getTransactionFormValues(transaction)
        : getDefaultTransactionFormValues(),
    );
    setAttachment(null);
  }, [form, mode, open, transaction]);

  useEffect(() => {
    if (!suggestionQuery.data) return;
    form.setValue("categoryId", suggestionQuery.data.data.id, { shouldValidate: true });
  }, [form, suggestionQuery.data]);

  const handleSubmit: SubmitHandler<TransactionFormValues> = (values) => {
    onSubmit(values, attachment);
    onOpenChange(false);
  };

  const handleAttachmentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAttachment(event.target.files?.item(0) ?? null);
  };

  const title = mode === "create" ? "Nova Transação" : "Editar Transação";
  const actionLabel = mode === "create" ? "Criar" : "Salvar";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid={dataTestId}>
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
                name="categoryId"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger aria-label="Categoria">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {transactionCategoryOptions.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError>{form.formState.errors.categoryId?.message}</FieldError>
              {suggestionQuery.data && (
                <FieldHint role="status">
                  Categoria sugerida automaticamente: {suggestionQuery.data.data.name}.
                </FieldHint>
              )}
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

          <Field>
            <Label htmlFor={`${mode}-transaction-attachment`}>Anexo (opcional)</Label>
            <Input
              id={`${mode}-transaction-attachment`}
              type="file"
              accept="application/pdf,image/jpeg,image/png"
              onChange={handleAttachmentChange}
            />
            <FieldHint>PDF, JPEG ou PNG de até 5 MB.</FieldHint>
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
