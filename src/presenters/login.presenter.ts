import { User } from '../models/user.model';
import { ILoginViewActions } from '../views/login.interface.view-actions';
import { ILoginPresenter } from './login.interface.presenter';

export class LoginPresenter implements ILoginPresenter {
  protected viewActions: ILoginViewActions;

  constructor(view: ILoginViewActions) {
    this.viewActions = view;
  }

  login(user: User): void {
      console.log('LoginPresenter - login with use: ', user);
      
    if (user.username === 'test') {
      this.viewActions.loginSuccess();
    } else {
      this.viewActions.loginFailed();
    }
  }
}
