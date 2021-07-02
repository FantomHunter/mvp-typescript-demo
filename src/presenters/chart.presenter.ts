import { Chart, ChartItem } from '../models/chart.model';
import { IChartView } from '../views/chart.view';

export interface IChartPresenter {
  sort(chart: Chart): void;
}

export class ChartPresenter implements IChartPresenter {
  protected chartView: IChartView;
  constructor(chartView: IChartView) {
    this.chartView = chartView;
  }
  sort(chart: Chart): void {
    console.log('sort');

    const n = chart.itemList.length;
    let arr = chart.itemList;
    let i, j;
    for (i = 0; i < n - 1; i++) {
      for (j = 0; j < n - i - 1; j++) {
        if (arr[j].size > arr[j + 1].size) {
          this.swap(arr, j, j + 1);
          console.log(arr);

          this.chartView.renderChart(chart);
          console.log(chart);
          return;
        }
      }
    }
    this.chartView.renderChart(chart);
  }

  swap(arr: ChartItem[], xp: number, yp: number) {
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
  }
}
