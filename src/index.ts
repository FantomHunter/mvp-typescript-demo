import { CircleDialog, RectangleDialog } from "./models/dialog.model";
import { ChartView } from "./views/chart.view";
import { LoginView } from "./views/login.view";

console.log('Hello from typescript parcel');
const app = new LoginView('root');
const char = new ChartView('barcontainer');


// const dialog = new RectangleDialog();
// dialog.parentsId = 'dialog';
// dialog.render();
const dialog = new CircleDialog();
dialog.parentsId = 'dialog';
dialog.render();