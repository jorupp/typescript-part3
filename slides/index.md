---
marp: true
theme: default
paginate: true
_paginate: false
style: |
    section {
        justify-content: flex-start;
    }
---

# Typescript part 3

Advanced typescript concepts

---

## Topics already covered in part 1 and 2

- CRA with typescript
- `tsconfig.json`
- Installing and reading type definitions for DOM/libraries
- switching from JS to TS (including rollup/webpack)
- basic types
- optional properties, chaining (`?.`), and non-null assertions (`!`)
- generics w/ interfaces and functions
- differences between `interface` (including merging) and `type`
- type casting

---

## Topics

- JSON (w/ type predicates + discriminated unions)
- Complex types (including conditional types and infer)
- Escape hatches (`any` vs. `unknown` + `never`)
- Typescript + JSX = TSX
- React.forwardRef
- Decorators
- Linting/formatting options
- Splitting compile + type-check steps

---

## JSON handling

- Approach 1: Parse-and-cast (ie. trust the server)
- Approach 2: Parse-check-cast (ie. trust-but-verify)
  - Schema + validator with manual type: <https://ajv.js.org/guide/typescript.html>
    - Can also glue a TS generator into that: <https://rehanvdm.com/blog/typescript-type-safety-with-ajv-standalone>
  - <https://github.com/pelotom/runtypes> - define checks and infer the typescript type

Examples: [`/pages/json.tsx`](/pages/json.tsx) + [`/models/index.ts`](/models/index.ts)

---

## Complex types

- Types can be defined as a manipulation of another type, such as extracting or transforming each key
- Can use conditional types with `infer` to get a type from within a generic
  - <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types>
  - <https://blog.logrocket.com/understanding-infer-typescript/>
- [Typescript utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html) (ie. `Partial`, `ReturnType`)
- React has a few too, like `ComponentProps`
- [`UnboxState` from `rp-react-best-practices`](https://github.com/Rightpoint/rp-react-best-practices/blob/master/src/lib/rtl-utils/interfaces/TestConfig.ts#L25)

Examples: [`/pages/complex-types.tsx`](/pages/complex-types.tsx)

---

## Escape hatches

`any` vs. `unknown` vs. `object`, and when should you use `never`

<https://blog.logrocket.com/when-to-use-never-and-unknown-in-typescript-5e4d6c5799ad/>

- `any` can be helpful when you know better than TS, but you can shoot yourself in the foot too
- `unknown` is what you should use when you don't know what type something is
- `never` gets used for certain safety-checks and with conditional types

Examples: [`/pages/escape.tsx`](/pages/escape.tsx)

---

## Typescript + JSX = TSX

- Cannot cast with `<Account>a` in `.tsx` files, must use `a as Account` - [they work the same](https://www.typescriptlang.org/docs/handbook/jsx.html#the-as-operator)
  - example: [`/components/castTest.ts`](/components/castTest.ts)[`(x)`](/components/castTest.tsx)
- The first character of tag indicates the type - [lower-case == HTML element, upper-case == React component](https://www.typescriptlang.org/docs/handbook/jsx.html#type-checking) - ie. `<footer>` vs `<Footer>`
  - example: [`/components/customElements.tsx`](/components/customElements.tsx)

---

## React.forwardRef

- [React docs](https://reactjs.org/docs/forwarding-refs.html) (though this doesn't handle types)
- [React typescript cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref)
  - [I think this explanation is more clear](https://www.carlrippon.com/react-forwardref-typescript)
- example: [`/pages/ref.tsx`](/pages/ref.tsx)

---

## Decorators

- [Typescript docs](https://www.typescriptlang.org/docs/handbook/decorators.html)
- Decorators do _not_ change what the typescript type of something is - ie. if you use a class decorator to add a new property, typescript won't know about it
- Commonly used with [Angular](https://angular.io/api/core/Component) and [NestJS](https://docs.nestjs.com/controllers#routing) (among other libraries)
- Since this wraps a class or member, it is a way to add similar behavior to a number of places
  - this looks a bit like decorators in Java Spring, or filter attributes in .Net MVC, though the mechanics are different

---

## Linting/formatting options

ESLint use plugins/rules to show warnings/errors about a number of things that aren't actually compilation errors, but indicate something possibly wrong with the code - everything from the rules-of-hooks to no-explicit-any and no unused variables.

[`rp-react-best-practices`](https://github.com/Rightpoint/rp-react-best-practices/blob/f0ca0fd32cb8a7fb1dc5c52c858d103ae92f9086/.eslintrc.json#L9-L16) has a good set of starting rules and also sometimes overrides them - ie.  [`no-explicit-any`](https://github.com/Rightpoint/rp-react-best-practices/blob/f0ca0fd32cb8a7fb1dc5c52c858d103ae92f9086/src/hooks/useForm.ts#L3-L4) or [`ts-ignore`](https://github.com/Rightpoint/rp-react-best-practices/blob/f0ca0fd32cb8a7fb1dc5c52c858d103ae92f9086/src/lib/rtl-utils/index.ts#L31-L33)

Use [`prettier`](https://prettier.io/) to format your code.  You can configure it to run on commit/push, but [run-on-save](https://github.com/Rightpoint/rp-react-best-practices/blob/master/README.md#recommended-vscode-configuration) better - install the [extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and put this in `.vscode/settings.json`:

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## Splitting compile + type-check steps

- Webpack with ts-loader (ie. what you get with `create-react-app`) does the typescript compilation and type checking
- Some other tools (ie. SWC/esbuild/bun/deno) don't always run full type-checking for typescript and have you run `tsc -noEmit` separately to get type-checking
  - Ie. Remix's default config sets [`noEmit:true`](https://github.com/Rightpoint/expert-finder/blob/6b57c35eb40877abcd9df038cb02276b016b5807/tsconfig.json#L17-L18) and has you run tsc yourself as a [separate npm script](https://github.com/Rightpoint/expert-finder/blob/6b57c35eb40877abcd9df038cb02276b016b5807/package.json#L11-L14)
