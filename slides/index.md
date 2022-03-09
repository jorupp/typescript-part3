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

## Topics already covered in part 1 and 2

- CRA with typescript
- `tsconfig.json`
- Installing and reading type definitions for DOM/libraries
- switching from JS to TS (including rollup/webpack)
- basic types
- optional properties, chaining (`?.`), and assertions (`!`)
- generics w/ interfaces and functions
- differences between `interface` (including merging) and `type`
- type casting

---

## Topics

TODO: reorganize these once I confirm what all parts 1 and 2 covered

- JSON
- Type definitions
- Conditional Types
- Escape hatches
- Compiler/linting options
- Typescript + JSX = TSX
- React.forwardRef
- Decorators

---

## JSON handling

- Trust-and-cast
- Schema + validator with manual type: <https://ajv.js.org/guide/typescript.html>
- Can also glue a TS generator into that: <https://rehanvdm.com/blog/typescript-type-safety-with-ajv-standalone>
- <https://github.com/pelotom/runtypes> looks like an interesting approach - instead of defining real typescript types, you use this library to define checking objects, then infer the typescript type from that.

---

## Exploring available type definitions

- Some libraries include their own types
- Those that don't but are popular often have them available on <https://github.com/DefinitelyTyped/DefinitelyTyped/>.
  - These should always be added as devDependencies, even if the library itself is a non-dev dependency
    - `react` -> `@types/react`
    - `@babel/core` -> `@types/babel__core`
- If you dig into them (ie. ctrl-click in VSCode), some complex libraries (ie. React) _will_ appear overwhelming.

---

## Conditional Types w/ Infer

- <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types>
- <https://blog.logrocket.com/understanding-infer-typescript/>
- ReturnType
- ComponentProps
- "Unbox" - <https://github.com/Rightpoint/rp-react-best-practices/blob/master/src/lib/rtl-utils/interfaces/TestConfig.ts#L25>

---

## Escape hatches

- Casting
- Any vs. unknown vs. object
  - <https://blog.logrocket.com/when-to-use-never-and-unknown-in-typescript-5e4d6c5799ad/>
  - Never is the smallest possible type
  - Any/Unknown are the largest possible type
    - Unknown makes you use type assertions to use it
    - Any lets you do whatever you want with it
  - T | never ⇒ T
  - T & unknown ⇒ T
  - Use never in when there will not or should not be a value.
  - Use unknown when there will be a value, but it might have any type.
  - Avoid using any unless you really need to (ie. integrating with a library with no or incomplete types)

---

## Compiler/linting options

- Typescript compiler options - <https://www.typescriptlang.org/tsconfig>
- Eslint options
  - no-explicit-any

---

## Splitting compile + type-check steps

Using both TSC and SWC/etc.

- Webpack with ts-loader does the typescript compilation and type checking
- Some other tools (ie. SWC/esbuild/bun/deno) don't always run full type-checking for typescript and have you run `tsc -noEmit` separately to get type-checking
  - Ie. Remix's default config sets noEmit:true and has you run tsc yourself as a separate npm script

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
 - mmention spring and .net filter decorators