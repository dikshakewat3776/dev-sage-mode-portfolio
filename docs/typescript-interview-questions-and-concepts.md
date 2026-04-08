# TypeScript Guide (Beginner-Friendly)

This guide is written for beginners who are preparing for interviews and also learning from a real project.

It has two parts:
- Core interview questions with simple answers
- TypeScript concepts used in this portfolio, explained with examples

---

## Part 1: Core TypeScript Interview Q&A

### 1) What is TypeScript, and why use it over JavaScript?
TypeScript is JavaScript + types.

You still write JavaScript logic, but TypeScript adds type checking before runtime. That means:
- fewer bugs from wrong values (`string` vs `number`)
- better autocomplete and hints in editor
- safer refactoring in large codebases

---

### 2) What is the difference between `type` and `interface`?
Both define shapes, but they are usually used differently:

- Use `interface` for object contracts
- Use `type` for unions, aliases, intersections, or computed types

```ts
interface Profile {
  name: string
  bio: string
}

type ThemeMode = 'dark' | 'light'
```

Interview-safe answer: *You can use both for objects, but `type` is more flexible for unions and advanced compositions.*

---

### 3) What are union types?
A union means a value can be one of multiple allowed types/values.

```ts
type ThemeMode = 'dark' | 'light'
```

This prevents invalid values like `'blue'`.

---

### 4) What are optional properties?
`?` means a property may exist or may be missing.

```ts
interface Project {
  title: string
  liveUrl?: string
}
```

Why useful: not all project cards may have a live demo URL.

---

### 5) What are generics?
Generics make code reusable while preserving type safety.

```ts
const getStoredValue = <T,>(key: string, fallback: T): T => {
  const raw = localStorage.getItem(key)
  return raw ? (JSON.parse(raw) as T) : fallback
}
```

Here `T` can be `boolean`, `string`, object, etc.

---

### 6) What is `Record<K, V>`?
`Record` is a utility type for key-value maps.

```ts
type Theme = 'dark' | 'light'
type ThemeLabel = Record<Theme, string>

const labels: ThemeLabel = {
  dark: 'Dark Mode',
  light: 'Light Mode',
}
```

Good for registries, lookup tables, and config maps.

---

### 7) Why use `import type`?
`import type` imports only types, not runtime code.

```ts
import type { Project } from '../types/content'
```

This avoids accidental runtime imports and keeps intent clear.

---

### 8) What is `unknown`? How is it different from `any`?
- `any`: disables type safety
- `unknown`: safer top type; you must check before using

```ts
function printLength(value: unknown) {
  if (typeof value === 'string') {
    console.log(value.length)
  }
}
```

Use `unknown` when shape is not known yet.

---

### 9) What is the non-null assertion operator (`!`)?
It tells TypeScript: "I am sure this is not null/undefined."

```ts
document.getElementById('root')!
```

Use carefully. If your assumption is wrong, runtime error can happen.

---

### 10) What is type assertion (`as`)?
Type assertion tells TypeScript to treat a value as a specific type.

```ts
const el = document.getElementById('chakra-animation-stage') as HTMLElement | null
```

Use when you know more than TS, but avoid overusing it.

---

### 11) How does TypeScript help in React?
- safer props contracts
- typed state with `useState<T>()`
- safer conditional rendering
- better long-term maintainability

```ts
const [subject, setSubject] = useState<StudySubject>('DSA')
```

---

### 12) What is narrowing?
Narrowing means reducing a broad type to a more specific one using checks.

```ts
if (entry.contentType === 'link') {
  // now TS knows this branch is "link" case
}
```

Common checks: `typeof`, `in`, equality checks, `instanceof`.

---

## Part 2: TypeScript Concepts Used in This Project

Below are the concepts already used in this codebase, explained for beginners.

### 1) Type aliases
```ts
type ThemeMode = 'dark' | 'light'
```
Think of this as naming a type so you can reuse it everywhere.

### 2) Literal unions
```ts
type ContentType = 'link' | 'markdown' | 'text'
```
Restricts values to known safe options.

### 3) Interfaces for domain models
```ts
interface StudyEntry {
  id: string
  subject: string
  contentType: 'link' | 'markdown' | 'text'
}
```
Defines the data contract for features.

### 4) Optional properties
```ts
interface Project {
  liveUrl?: string
}
```
Perfect when some data fields are optional.

### 5) Typed arrays
```ts
const projects: Project[] = []
```
Every item in the array must match `Project`.

### 6) Type-only imports
```ts
import type { StudyEntry } from '../types/content'
```
Clear separation of types vs runtime values.

### 7) Generic functions
```ts
function identity<T>(value: T): T {
  return value
}
```
One function, many type-safe use cases.

### 8) Generic library APIs
```ts
create<PortfolioState>((set) => ({ /* ... */ }))
```
Library APIs can be bound to your app's exact state shape.

### 9) Utility types (`Record`)
```ts
type Registry = Record<'a' | 'b', number>
```
Quick way to define typed object maps.

### 10) Function type signatures
```ts
type Toggle = (enabled: boolean) => void
```
Explicit function contracts reduce integration mistakes.

### 11) Nullable unions
```ts
let activeType: AnimationType | null = null
```
Represents "value may not be set yet."

### 12) Optional chaining + nullish coalescing
```ts
const title = selected?.title ?? 'Untitled'
```
Safe access + fallback default.

### 13) Non-null assertion
```ts
document.getElementById('root')!
```
Shortcut for known-safe DOM cases.

### 14) Type assertions
```ts
const node = el as HTMLElement
```
Use when TS cannot infer what you know.

### 15) `unknown` for uncertain shape
```ts
let state: unknown
```
For unknown values that must be checked before use.

### 16) Typed React props
```ts
type LayoutProps = { children: ReactNode }
```
Makes component usage safer and clearer.

### 17) Typed React state
```ts
const [mode, setMode] = useState<ThemeMode>('dark')
```
Prevents invalid state values.

### 18) Discriminated-style conditional rendering
```ts
entry.contentType === 'markdown' ? <Markdown /> : <p>Text</p>
```
A clean pattern to render different UIs based on a type field.

---

## Part 3: Next-Level Topics (After Basics)

### A) `never` and exhaustive checks
Use this in `switch` to ensure every union case is handled.

```ts
type ContentType = 'link' | 'markdown' | 'text'

function renderByType(type: ContentType) {
  switch (type) {
    case 'link':
      return 'Render anchor'
    case 'markdown':
      return 'Render markdown'
    case 'text':
      return 'Render plain text'
    default: {
      const _exhaustive: never = type
      return _exhaustive
    }
  }
}
```

If a new case is added later, TypeScript will force you to handle it.

### B) Mapped types and conditional types
These create reusable type logic.

```ts
type StudyEntry = {
  id: string
  title?: string
  subject: string
}

type RequiredStudyEntry = {
  [K in keyof StudyEntry]-?: StudyEntry[K]
}

type Label<T> = T extends string ? 'text' : 'non-text'
```

- Mapped type: transforms each property
- Conditional type: returns type based on condition

### C) `keyof`, indexed access, `typeof`
Use these to derive types from existing values and avoid repetition.

```ts
const profile = {
  name: 'Diksha',
  tagline: 'Builder',
}

type Profile = typeof profile
type ProfileKey = keyof Profile
type TaglineType = Profile['tagline']
```

### D) Runtime schema validation (Zod)
TypeScript checks compile-time types, not runtime data validity.

```ts
import { z } from 'zod'

const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  githubUrl: z.string().url(),
})

const parsed = ProjectSchema.safeParse(dataFromApi)
if (!parsed.success) {
  // invalid input
} else {
  const project = parsed.data // validated + typed
}
```

Use this when data comes from APIs, forms, localStorage, or URL params.

---