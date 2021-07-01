import { Chart, ChartItem } from '../models/chart.model';

export class ChartView {
  protected root: HTMLElement | null;

  constructor(chartRootSelector: string) {
    this.root = document.getElementById(chartRootSelector);

    // render init chart
    let chart: Chart = {
      itemList: [
        { label: '1', size: 20 },
        { label: '2', size: 30 },
        { label: '3', size: 80 },
        { label: '4', size: 50 },
        { label: '5', size: 70 },
        { label: '6', size: 50 },
      ],
    };
    this.renderChart(chart);

    // render button
    let sortButton = <HTMLButtonElement>document.createElement('button');
    sortButton.textContent = 'Sort';
    sortButton.addEventListener('click', () => {
      console.log('sort');

      const n = chart.itemList.length;
      let arr = chart.itemList;
      let i, j;
      for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
          if (arr[j].size > arr[j + 1].size) {
            this.swap(arr, j, j + 1);
            console.log(arr);

            this.renderChart(chart);
            console.log(chart);
          }
        }
      }
    });
    document.getElementById('root')?.append(sortButton);
  }

  private renderChart(chart: Chart) {
    console.log('render chart', chart);
    if (this.root) this.root.innerHTML = '<div class="barcontainerheader">Bar Graph</div>';

    chart.itemList.forEach((item) => {
      let htmlTemplate = `
        <div class="bar" style="height: ${item.size}%">
            ${item.size}
            <div class="barlabel">${item.label}</div>
        </div>
    `;
      let itemHtml = this.createElementFromHTML(htmlTemplate);
      if (itemHtml != null) {
        this.root?.append(itemHtml);
      }
    });
  }

  createElementFromHTML(htmlString: string) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
  }

  swap(arr: ChartItem[], xp: number, yp: number) {
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
  }
}
