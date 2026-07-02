import { hash as hash1, verify as verify1 } from "./mod.ts";
import { compare as verify2, hash as hash2 } from "bcrypt_x";
import { compare as verify3, hash as hash3 } from "bcryptjs";

const password =
	"2gnF!WAcyhp#kB@tcYQa2$A%P64jEmXY!@8n2GSH$GggfgGfP*qH!EWwDaB%5mdB6pW2fK!KD@YNjvqwREfRCCAPc54c5@Sk";
const hashed = "$2y$10$1/Er.wWMtY0TbOls1ohxGeFMX2eAWTiTKPpKgWPtJ8QteCbFjzoda";
const cost = 10;

Deno.bench("bcrypt ffi", {
	group: "hashing",
	baseline: true,
}, async () => {
	await hash1(password, cost);
});

Deno.bench("x/bcrypt", {
	group: "hashing",
}, async () => {
	await hash2(password);
});

Deno.bench("npm:bcryptjs", {
	group: "hashing",
}, async () => {
	await hash3(password, cost);
});

Deno.bench("bcrypt ffi", {
	group: "verifying",
	baseline: true,
}, async () => {
	await verify1(password, hashed);
});

Deno.bench("x/bcrypt", {
	group: "verifying",
}, async () => {
	await verify2(password, hashed);
});

Deno.bench("npm:bcryptjs", {
	group: "verifying",
}, async () => {
	await verify3(password, hashed);
});
