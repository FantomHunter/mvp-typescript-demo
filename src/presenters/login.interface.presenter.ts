import { User } from "../models/user.model";

export interface ILoginPresenter {
    login(user: User): void;
}