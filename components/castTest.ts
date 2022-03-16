import { Garage } from "../models";

export const castTest = <Garage>{};
export const castTest2 = {} as Garage;
// export const castTest3 = "asdf" as number; // typescript won't allow you to make a cast it knows can never work
export const castTest4 = "asdf" as any as number; // but if you go through `any`, it'll let you do anything you want
export const castTest5 = "asdf" as unknown as number; // `unknown` works too
