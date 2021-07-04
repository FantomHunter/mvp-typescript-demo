import { from, Observable, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
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

    // this.bubleSort(chart)
    //   .pipe(delay(1000))
    //   .subscribe((chart) => {
    //     if (chart) this.chartView.renderChart(chart);
    //   });

    this.bubleSortAutomate(chart)
      .pipe(
        concatMap(x => of(x).pipe(delay(1000)))
      )
      .subscribe((chart) => {
        if (chart) this.chartView.renderChart(chart);
      });
  }

  swap(arr: ChartItem[], xp: number, yp: number) {
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
  }

  private bubleSort(chart: Chart): Observable<Chart | null> {
    const n = chart.itemList.length;
    let arr = chart.itemList;
    let i, j;
    for (i = 0; i < n - 1; i++) {
      for (j = 0; j < n - i - 1; j++) {
        if (arr[j].size > arr[j + 1].size) {
          this.swap(arr, j, j + 1);
          return of(chart);
        }
      }
    }
    return of(null);
  }

  private bubleSortAutomate(chart: Chart): Observable<Chart | null> {
    let chartStep: Chart[] = [];
    const n = chart.itemList.length;
    let arr = chart.itemList;
    let i, j;
    for (i = 0; i < n - 1; i++) {
      for (j = 0; j < n - i - 1; j++) {
        if (arr[j].size > arr[j + 1].size) {
          this.swap(arr, j, j + 1);
          // clone object
          const currentChart:Chart = {itemList: [...chart.itemList]}
          chartStep.push(currentChart);
        }
      }
    }
    return from(chartStep);
  }

}
