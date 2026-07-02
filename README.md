# Bcrypt for Deno

Bcrypt hashing library for [Deno](https://deno.land). It uses rust
[bcrypt](https://crates.io/crates/bcrypt) via
[Deno FFI](https://deno.land/manual@v1.30.0/runtime/ffi_api) which requires Deno
v1.30.0 or higher.

## Benchmarks

Benchmark measures performance against [x/bcrypt](https://deno.land/x/bcrypt).
See [`benchmarks`](./all.bench.ts) for more details.

```
CPU | Apple M2 Pro
Runtime | Deno 2.9.1 (aarch64-apple-darwin)

file://[redacted]/deno-bcrypt/all.bench.ts

| benchmark      | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| -------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |

group hashing
| bcrypt ffi     |         56.6 ms |          17.7 | ( 55.2 ms …  58.9 ms) |  56.9 ms |  58.9 ms |  58.9 ms |
| x/bcrypt       |         70.7 ms |          14.2 | ( 68.7 ms …  74.9 ms) |  71.2 ms |  74.9 ms |  74.9 ms |
| npm:bcryptjs   |         66.3 ms |          15.1 | ( 62.5 ms …  86.1 ms) |  67.3 ms |  86.1 ms |  86.1 ms |

summary
bcrypt ffi
 1.17x faster than npm:bcryptjs
 1.25x faster than x/bcrypt

group verifying
| bcrypt ffi     |         56.6 ms |          17.7 | ( 55.5 ms …  57.6 ms) |  57.4 ms |  57.6 ms |  57.6 ms |
| x/bcrypt       |         71.6 ms |          14.0 | ( 69.2 ms …  75.5 ms) |  72.2 ms |  75.5 ms |  75.5 ms |
| npm:bcryptjs   |         63.6 ms |          15.7 | ( 61.2 ms …  78.3 ms) |  63.5 ms |  78.3 ms |  78.3 ms |

summary
bcrypt ffi
 1.12x faster than npm:bcryptjs
 1.26x faster than x/bcrypt
```

## API

```ts
hash(password: string, cost: number = 12): Promise<string>
verify(password: string, hash: string): Promise<boolean>
```

## Usage

```ts
import { hash, verify } from "jsr:@felix/bcrypt";

const password = "password";

const hashed = await hash(password);
const isMatch = await verify(password, hashed);
console.log(hashed, isMatch);
```
