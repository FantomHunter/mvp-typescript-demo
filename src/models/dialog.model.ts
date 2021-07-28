export interface Button {
  render(parentsId: string): void;
  onclick(): any;
}
export abstract class Dialog {
  private _parentsId: string = '';
  public get parentsId(): string {
    return this._parentsId;
  }
  public set parentsId(value: string) {
    this._parentsId = value;
  }
  render(): void {
    let button = this.createButton();
    button.render(this._parentsId);
  }
  abstract createButton(): Button;
}

export class RectangleButton implements Button {
  render(parentsId: string): void {
    let rectangleButton = <HTMLButtonElement>document.createElement('button');
    rectangleButton.textContent = 'Rectangle';
    rectangleButton.addEventListener('click', this.onclick());
    document.getElementById(parentsId)?.append(rectangleButton);
  }

  onclick(): (this: HTMLButtonElement, ev: MouseEvent) => any {
    return () => {
      console.log('This is Rectangle button');
    };
  }
}

export class CircleButton implements Button {
  render(parentsId: string): void {
    let circleButton = <HTMLButtonElement>document.createElement('button');
    circleButton.textContent = 'Circle';
    circleButton.addEventListener('click', this.onclick());
    document.getElementById(parentsId)?.append(circleButton);
  }
  onclick(): (this: HTMLButtonElement, ev: MouseEvent) => any {
    return () => {
      console.log('This is Circle button');
    };
  }
}

export class RectangleDialog extends Dialog {
  createButton(): Button {
    return new RectangleButton();
  }
}

export class CircleDialog extends Dialog {
  createButton(): Button {
    return new CircleButton();
  }
}
