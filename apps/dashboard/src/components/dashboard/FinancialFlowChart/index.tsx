import type { IFinancialFlowChartProps } from "./interface";
import {
  AccessibleTable,
  Bar,
  Bars,
  FlowHeader,
  FlowRoot,
  FlowTitle,
  Legend,
  LegendItem,
  Period,
  PeriodLabel,
  Plot,
} from "./styled";

export const FinancialFlowChart = ({
  cashFlow,
  "data-testid": dataTestId,
}: IFinancialFlowChartProps) => (
  <FlowRoot data-testid={dataTestId} aria-labelledby="financial-flow-title">
    <FlowHeader>
      <FlowTitle id="financial-flow-title">{cashFlow.title}</FlowTitle>
      <Legend aria-label="Legenda do gráfico">
        <LegendItem>Receitas</LegendItem>
        <LegendItem $expense>Despesas</LegendItem>
      </Legend>
    </FlowHeader>

    <Plot aria-hidden="true">
      <Period>
        <Bars>
          <Bar $height={cashFlow.firstPeriod.incomeHeight} />
          <Bar $height={cashFlow.firstPeriod.expenseHeight} $expense />
        </Bars>
        <PeriodLabel>{cashFlow.firstPeriod.label}</PeriodLabel>
      </Period>
      <Period>
        <Bars>
          <Bar $height={cashFlow.secondPeriod.incomeHeight} />
          <Bar $height={cashFlow.secondPeriod.expenseHeight} $expense />
        </Bars>
        <PeriodLabel>{cashFlow.secondPeriod.label}</PeriodLabel>
      </Period>
      <Period>
        <Bars>
          <Bar $height={cashFlow.thirdPeriod.incomeHeight} />
          <Bar $height={cashFlow.thirdPeriod.expenseHeight} $expense />
        </Bars>
        <PeriodLabel>{cashFlow.thirdPeriod.label}</PeriodLabel>
      </Period>
      <Period>
        <Bars>
          <Bar $height={cashFlow.fourthPeriod.incomeHeight} />
          <Bar $height={cashFlow.fourthPeriod.expenseHeight} $expense />
        </Bars>
        <PeriodLabel>{cashFlow.fourthPeriod.label}</PeriodLabel>
      </Period>
      <Period>
        <Bars>
          <Bar $height={cashFlow.fifthPeriod.incomeHeight} />
          <Bar $height={cashFlow.fifthPeriod.expenseHeight} $expense />
        </Bars>
        <PeriodLabel>{cashFlow.fifthPeriod.label}</PeriodLabel>
      </Period>
      <Period>
        <Bars>
          <Bar $height={cashFlow.sixthPeriod.incomeHeight} />
          <Bar $height={cashFlow.sixthPeriod.expenseHeight} $expense />
        </Bars>
        <PeriodLabel>{cashFlow.sixthPeriod.label}</PeriodLabel>
      </Period>
    </Plot>

    <AccessibleTable>
      <caption>{cashFlow.accessibleDescription}</caption>
      <thead>
        <tr>
          <th scope="col">Período</th>
          <th scope="col">Receitas</th>
          <th scope="col">Despesas</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{cashFlow.firstPeriod.label}</th>
          <td>{cashFlow.firstPeriod.income.formattedValue}</td>
          <td>{cashFlow.firstPeriod.expense.formattedValue}</td>
        </tr>
        <tr>
          <th scope="row">{cashFlow.secondPeriod.label}</th>
          <td>{cashFlow.secondPeriod.income.formattedValue}</td>
          <td>{cashFlow.secondPeriod.expense.formattedValue}</td>
        </tr>
        <tr>
          <th scope="row">{cashFlow.thirdPeriod.label}</th>
          <td>{cashFlow.thirdPeriod.income.formattedValue}</td>
          <td>{cashFlow.thirdPeriod.expense.formattedValue}</td>
        </tr>
        <tr>
          <th scope="row">{cashFlow.fourthPeriod.label}</th>
          <td>{cashFlow.fourthPeriod.income.formattedValue}</td>
          <td>{cashFlow.fourthPeriod.expense.formattedValue}</td>
        </tr>
        <tr>
          <th scope="row">{cashFlow.fifthPeriod.label}</th>
          <td>{cashFlow.fifthPeriod.income.formattedValue}</td>
          <td>{cashFlow.fifthPeriod.expense.formattedValue}</td>
        </tr>
        <tr>
          <th scope="row">{cashFlow.sixthPeriod.label}</th>
          <td>{cashFlow.sixthPeriod.income.formattedValue}</td>
          <td>{cashFlow.sixthPeriod.expense.formattedValue}</td>
        </tr>
      </tbody>
    </AccessibleTable>
  </FlowRoot>
);
