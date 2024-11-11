import { BarChart } from '@mantine/charts';
import { data } from './data.index';
import { Button, Group } from '@mantine/core';

export default function AnalyticModule() {
  return (
    <>
    <h1>Analytic</h1>
    <Group gap={0} justify="flex-end">
        <Button onClick={() => open()} >
          View Details
        </Button>
      </Group>
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      withLegend
      series={[
        { name: 'Awareness', color: 'violet.6' },
        { name: 'Patient', color: 'blue.6' },
        { name: 'Testmental', color: 'teal.6' },
      ]}
      tickLine="y"
    />
  </>
  );
}