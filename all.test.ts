import {
	assert,
	assertEquals,
	assertFalse,
} from "https://deno.land/std@0.196.0/assert/mod.ts";
import { hash, verify } from "./mod.ts";

const password =
	"2gnF!WAcyhp#kB@tcYQa2$A%P64jEmXY!@8n2GSH$GggfgGfP*qH!EWwDaB%5mdB6pW2fK!KD@YNjvqwREfRCCAPc54c5@Sk";
const hashed = "$2y$10$1/Er.wWMtY0TbOls1ohxGeFMX2eAWTiTKPpKgWPtJ8QteCbFjzoda";

Deno.test("hash", async () => {
	const hashed = await hash(password);

	assert(hashed);
	assertEquals(typeof hashed, "string");
});

Deno.test("verify", async () => {
	assert(await verify(password, hashed));
	assertFalse(await verify("wrong password", hashed));
});
