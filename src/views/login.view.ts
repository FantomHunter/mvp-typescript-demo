import { User } from '../models/user.model';
import { LoginPresenter } from '../presenters/login.presenter';
import { ILoginViewActions } from './login.interface.view-actions';

export class LoginView implements ILoginViewActions {
  root: HTMLElement | null;

  constructor(rootSelector: string) {
    let presenter = new LoginPresenter(this);

    this.root = document.getElementById(rootSelector);
    // let form = this.createElement('form');
    let input: HTMLInputElement = <HTMLInputElement>this.createElement('input');
    input.type = 'text';
    input.placeholder = 'Username';
    input.name = 'username';
    input.id = 'username';
    let statusText = <HTMLHeadingElement>this.createElement('h1');
    statusText.textContent = '';
    statusText.id = 'status';

    let submitButton = <HTMLButtonElement>this.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', () => {
      const value = <HTMLInputElement>document.getElementById('username');
      if (value != undefined) {
        const user: User = { username: value.value, password: '' };
        presenter.login(user);
      }
    });

    this.root?.append(input, statusText, submitButton);
  }

  loginSuccess(): void {
    let element = document.getElementById('status');
    if (element) element.innerHTML = 'success';
  }
  loginFailed(): void {
    let element = document.getElementById('status');
    if (element) element.innerHTML = 'failed';
  }

  createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector: string): Element | null {
    const element = document.querySelector(selector);

    return element;
  }
}
