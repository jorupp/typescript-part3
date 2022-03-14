import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  Ref,
} from "react";

interface Person {
  firstName: string;
  lastName: string;
  age: number;
}
type AllStrings<T> = { [P in keyof T]: string };

type AllStringsPerson = AllStrings<Person>;
type PartialPerson = Partial<Person>;
type NoAgePerson = Omit<Person, "age">;
type NamePerson = Pick<Person, "firstName" | "lastName">; // note how this is | not ,

// conditional types using infer can do interesting things when recursive
type PromiseResult<T> = T extends Promise<infer P> ? PromiseResult<P> : T;

type DeepPromise = Promise<Promise<Promise<Promise<string>>>>;
type DeepPromiseResult = PromiseResult<DeepPromise>;

// react recommends using ComponentPropsWithoutRef or ComponentPropsWithRef instead of ComponentProps
const InferPage = (props: { name: string }) => <div>blank page</div>;

type InferPageProps = ComponentProps<typeof InferPage>;
type InferPagePropsNoRef = ComponentPropsWithoutRef<typeof InferPage>;
type InferPagePropsWithRef = ComponentPropsWithRef<typeof InferPage>;
type InferDivProps = ComponentPropsWithoutRef<"div">;
type InferPageReturnValue = ReturnType<typeof InferPage>;

export default InferPage;
