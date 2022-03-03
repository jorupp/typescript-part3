import { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

type PromiseResult<T> = T extends Promise<infer P> ? PromiseResult<P> : T;

type DeepPromise = Promise<Promise<Promise<Promise<string>>>>;
type DeepPromiseResult = PromiseResult<DeepPromise>;

type InferPageProps = ComponentPropsWithoutRef<typeof InferPage>;
type InferPagePropsWithRef = ComponentPropsWithRef<typeof InferPage>;
type InferDivProps = ComponentPropsWithoutRef<'div'>;
type InferPageReturnValue = ReturnType<typeof InferPage>;

const InferPage = (props: { name: string}) => <div>blank page</div>;
export default InferPage;
