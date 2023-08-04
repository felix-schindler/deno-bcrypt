import { hash, verify } from "./mod.ts";
import {
	compare as verify2,
	hash as hash2,
} from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const password =
	"2gnF!WAcyhp#kB@tcYQa2$A%P64jEmXY!@8n2GSH$GggfgGfP*qH!EWwDaB%5mdB6pW2fK!KD@YNjvqwREfRCCAPc54c5@Sk";
const hashed = "$2y$10$1/Er.wWMtY0TbOls1ohxGeFMX2eAWTiTKPpKgWPtJ8QteCbFjzoda";

Deno.bench("bcrypt ffi", {
	group: "hashing",
	baseline: true,
}, async () => {
	await hash(password);
});

Deno.bench("bcrypt", {
	group: "hashing",
}, async () => {
	await hash2(password);
});

Deno.bench("bcrypt ffi", {
	group: "verifying",
	baseline: true,
}, async () => {
	await verify(password, hashed);
});

Deno.bench("bcrypt", {
	group: "verifying",
}, async () => {
	await verify2(password, hashed);
});
