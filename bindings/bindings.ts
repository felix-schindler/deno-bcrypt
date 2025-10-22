import { dlopen, type FetchOptions } from "@denosaurs/plug";

export const VERSION = "1.0.5";

// Auto-generated with deno_bindgen
function encode(v: string): ArrayBuffer {
	return new TextEncoder().encode(v).buffer;
}

function decode(v: Uint8Array): string {
	return new TextDecoder().decode(v);
}

// deno-lint-ignore no-explicit-any
function readPointer(v: any): Uint8Array {
	const ptr = new Deno.UnsafePointerView(v);
	const lengthBe = new Uint8Array(4);
	const view = new DataView(lengthBe.buffer);
	ptr.copyInto(lengthBe, 0);
	const buf = new Uint8Array(view.getUint32(0));
	ptr.copyInto(buf, 4);
	return buf;
}

function getLocalUrl(): string {
	const url = new URL("../target/release", import.meta.url);

	let uri = url.pathname;
	if (!uri.endsWith("/")) uri += "/";

	// https://docs.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-loadlibrarya#parameters
	if (Deno.build.os === "windows") {
		uri = uri.replace(/\//g, "\\");
		// Remove leading slash
		if (uri.startsWith("\\")) {
			uri = uri.slice(1);
		}
	}

	return uri;
}

/**
 * Returns a short architecture name based on the current Deno build architecture.
 */
function archShort(): string {
	switch (Deno.build.arch) {
		case "aarch64":
			return "ARM64";
		case "x86_64":
			return "X64";
	}
}

const LOCAL = Deno.env.get("LOCAL");

/**
 * Configuration options for fetching the Argon2 module, determining whether to fetch from a local source or a remote URL.
 */
const FETCH_OPTIONS: FetchOptions = {
	name: LOCAL || Deno.build.os === "windows"
		? "deno_bcrypt"
		: "deno_bcrypt-" + archShort(),
	url: LOCAL
		? getLocalUrl()
		: `https://github.com/felix-schindler/deno-bcrypt/releases/download/v${VERSION}/`,
	cache: LOCAL ? "reloadAll" : "use",
};

const SYMBOLS = {
	hash: {
		parameters: ["buffer", "usize"],
		result: "buffer",
		nonblocking: true,
	},
	verify: {
		parameters: ["buffer", "usize", "buffer", "usize"],
		result: "i8",
		nonblocking: true,
	},
} as const;

const { symbols } = await dlopen(
	FETCH_OPTIONS,
	SYMBOLS,
);

export function hash(a0: string): Promise<string> {
	const a0_buf = encode(a0);

	const rawResult = symbols.hash(a0_buf, BigInt(a0_buf.byteLength));
	const result = rawResult.then(readPointer);
	return result.then(decode);
}
export function verify(a0: string, a1: string): Promise<number> {
	const a0_buf = encode(a0);
	const a1_buf = encode(a1);

	const rawResult = symbols.verify(
		a0_buf,
		BigInt(a0_buf.byteLength),
		a1_buf,
		BigInt(a1_buf.byteLength),
	);
	const result = rawResult;
	return result;
}
