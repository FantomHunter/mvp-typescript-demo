import { ChartPresenter, IChartPresenter } from './../presenters/chart.presenter';
import { Chart, ChartItem } from '../models/chart.model';

export interface IChartView {
  renderChart(chart: Chart):void;
}
export class ChartView implements IChartView {
  protected root: HTMLElement | null;
  protected presenter: IChartPresenter;

  constructor(chartRootSelector: string) {
    this.presenter = new ChartPresenter(this);

    this.root = document.getElementById(chartRootSelector);

    // render init chart
    let chart = {
      itemList: [
        { label: '1', size: 90 },
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
      this.presenter.sort(chart)
    });
    document.getElementById('panel')?.append(sortButton);
  }

  renderChart(chart: Chart) {
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
}
