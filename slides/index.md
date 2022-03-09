---
marp: true
title: Typescript part 3
description: Advanced topics
theme: default
paginate: true
_paginate: false
style: |
    section {
        justify-content: flex-start;
    }
---

## Typescript part 3

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

TODO: reorganize these once I confirm what all parts 1 and 2 covered

- JSON (w/ type predicates + discriminated unions)
- Conditional Types w/ Infer
- Escape hatches (`any` vs. `unknown` + `never`)
- Linting options
- Splitting compile + type-check steps
- Typescript + JSX = TSX
- React.forwardRef
- Decorators

---

## JSON handling

- Approach 1: Parse-and-cast (ie. trust the server)
- Approach 2: Parse-check-cast (ie. trust-but-verify)
  - Schema + validator with manual type: <https://ajv.js.org/guide/typescript.html>
    - Can also glue a TS generator into that: <https://rehanvdm.com/blog/typescript-type-safety-with-ajv-standalone>
  - <https://github.com/pelotom/runtypes> - define checks and infer the typescript type

Examples: [`/pages/json.tsx`](/pages/json.tsx)

---

## Conditional Types w/ Infer

- <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types>
- <https://blog.logrocket.com/understanding-infer-typescript/>
- ReturnType
- ComponentProps
- "Unbox" - <https://github.com/Rightpoint/rp-react-best-practices/blob/master/src/lib/rtl-utils/interfaces/TestConfig.ts#L25>

Examples: [`/pages/infer.tsx`](/pages/infer.tsx)

---

## Escape hatches

`any` vs. `unknown` vs. `object`, and when should you use `never`

<https://blog.logrocket.com/when-to-use-never-and-unknown-in-typescript-5e4d6c5799ad/>

- `any` can be helpful when you know better than TS, but you can shoot yourself in the foot too
- `unknown` is what you should use when you don't know what type something is
- `never` gets used for certain safety-checks and with conditional types

Examples: [`/pages/escape.tsx`](/pages/escape.tsx)

---

## Compiler/linting options

- TODO: Add suggestions of recommended linting rules to use
- TODO: Add info on how/when to run these checks
- TODO: Add info on how/when to override those rules
  - ie., no-explicit-any

---

## Splitting compile + type-check steps

- Webpack with ts-loader does the typescript compilation and type checking
- Some other tools (ie. SWC/esbuild/bun/deno) don't always run full type-checking for typescript and have you run `tsc -noEmit` separately to get type-checking
  - Ie. Remix's default config sets noEmit:true and has you run tsc yourself as a separate npm script
    - <https://github.com/Rightpoint/expert-finder/blob/6b57c35eb40877abcd9df038cb02276b016b5807/package.json#L11-L14>
    - <https://github.com/Rightpoint/expert-finder/blob/6b57c35eb40877abcd9df038cb02276b016b5807/tsconfig.json#L17-L18>

---

## Typescript + JSX = TSX

- `<Account>a` vs `a as Account`
- div vs. MyComponent - <https://www.typescriptlang.org/docs/handbook/jsx.html#type-checking>
- JSX.IntrinsicElements - <https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements>

---

## React.forwardRef

- <https://reactjs.org/docs/forwarding-refs.html>
- <https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/>, though <https://www.carlrippon.com/react-forwardref-typescript/> explains it better
  - Set up a code sandbox to run through this live

---

## Decorators

- <https://www.typescriptlang.org/docs/handbook/decorators.html>
- Decorators do _not_ change what the typescript type of something is - ie. if you use a class decorator to add a new property, typescript won't know about it
- Commonly used with [Angular](https://angular.io/api/core/Component) and [NestJS](https://docs.nestjs.com/controllers#routing) (among other libraries)
- Since this wraps a class or member, it is a way to add similar behavior to a number of places
  - this looks a bit like decorators in Java Spring, or attributes in .Net MVC, though the mechanics are different
