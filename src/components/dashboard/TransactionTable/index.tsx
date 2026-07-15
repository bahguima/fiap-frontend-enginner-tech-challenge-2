"use client";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { VisuallyHidden } from "@/styles/shared";

import type { StatusIconProps, TransactionActionsMenuProps, TransactionTableProps } from "./interface";
import {
  ActionMenuContent,
  ActionsCell,
  AmountCell,
  BodyCell,
  BodyRow,
  CompletedIcon,
  DestructiveMenuItem,
  DesktopTableWrap,
  ExpenseIcon,
  FailedIcon,
  HeaderCell,
  HeaderRow,
  IncomeIcon,
  MobileAmount,
  MobileDescription,
  MobileItem,
  MobileItemInfo,
  MobileList,
  MobileMeta,
  MutedCell,
  PendingIcon,
  Status,
  Table,
  TableRoot,
  TransactionCell,
  TypeIconBox,
} from "./styled";

export function TransactionTable({ "data-testid": dataTestId, data, onView, onEdit, onDelete }: TransactionTableProps) {
  const { t } = useLanguage();
  const hasActions = Boolean(onView || onEdit || onDelete);

  const statusLabel = (status: StatusIconProps["status"]) => t(`table.${status}`);

  return (
    <TableRoot data-testid={dataTestId}>
      <DesktopTableWrap>
        <Table>
          <thead>
            <HeaderRow>
              <HeaderCell>{t("table.transaction")}</HeaderCell>
              <HeaderCell>{t("table.category")}</HeaderCell>
              <HeaderCell>{t("table.date")}</HeaderCell>
              <HeaderCell>{t("table.status")}</HeaderCell>
              <HeaderCell $align="right">{t("table.amount")}</HeaderCell>
              {hasActions && <HeaderCell $align="right">Ações</HeaderCell>}
            </HeaderRow>
          </thead>
          <tbody>
            {data.map((transaction) => (
              <BodyRow key={transaction.id}>
                <TransactionCell>
                  <TypeIconBox $type={transaction.type}>
                    {transaction.type === "income" ? <IncomeIcon size={14} /> : <ExpenseIcon size={14} />}
                  </TypeIconBox>
                  {transaction.description}
                </TransactionCell>
                <MutedCell>{transaction.category.name}</MutedCell>
                <MutedCell>{transaction.formattedDate}</MutedCell>
                <BodyCell>
                  <Status>
                    <StatusIcon status={transaction.status} />
                    {statusLabel(transaction.status)}
                  </Status>
                </BodyCell>
                <AmountCell $type={transaction.type}>
                  {transaction.formattedAmount}
                </AmountCell>
                {hasActions && (
                  <ActionsCell>
                    <TransactionActionsMenu transaction={transaction} onView={onView} onEdit={onEdit} onDelete={onDelete} />
                  </ActionsCell>
                )}
              </BodyRow>
            ))}
          </tbody>
        </Table>
      </DesktopTableWrap>

      <MobileList>
        {data.map((transaction) => (
          <MobileItem key={transaction.id}>
            <MobileItemInfo>
              <TypeIconBox $type={transaction.type}>
                {transaction.type === "income" ? <IncomeIcon size={14} /> : <ExpenseIcon size={14} />}
              </TypeIconBox>
              <div>
                <MobileDescription>{transaction.description}</MobileDescription>
                <MobileMeta>
                  {transaction.category.name} · {transaction.formattedDate}
                </MobileMeta>
              </div>
            </MobileItemInfo>
            <MobileAmount $type={transaction.type}>
              {transaction.formattedAmount}
            </MobileAmount>
            {hasActions && (
              <TransactionActionsMenu transaction={transaction} onView={onView} onEdit={onEdit} onDelete={onDelete} />
            )}
          </MobileItem>
        ))}
      </MobileList>
    </TableRoot>
  );
}

function TransactionActionsMenu({
  transaction,
  onView,
  onEdit,
  onDelete,
}: TransactionActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size="icon" aria-label={`Ações para ${transaction.description}`}>
          <MoreHorizontal />
          <VisuallyHidden>Abrir ações</VisuallyHidden>
        </Button>
      </DropdownMenuTrigger>
      <ActionMenuContent align="end">
        {onView && (
          <DropdownMenuItem onSelect={() => onView(transaction)}>
            <Eye />
            Ver detalhes
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onSelect={() => onEdit(transaction)}>
            <Pencil />
            Editar
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DestructiveMenuItem onSelect={() => onDelete(transaction)}>
            <Trash2 />
            Excluir
          </DestructiveMenuItem>
        )}
      </ActionMenuContent>
    </DropdownMenu>
  );
}

function StatusIcon({ status }: StatusIconProps) {
  if (status === "pending") {
    return <PendingIcon size={14} />;
  }

  if (status === "failed") {
    return <FailedIcon size={14} />;
  }

  return <CompletedIcon size={14} />;
}
