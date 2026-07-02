import { dlopen, type FetchOptions } from "@denosaurs/plug";

export const VERSION = "2.1.0";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

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
	name: LOCAL ? "deno_bcrypt" : "deno_bcrypt-" + archShort(),
	url: LOCAL
		? getLocalUrl()
		: `https://github.com/felix-schindler/deno-bcrypt/releases/download/v${VERSION}/`,
	cache: LOCAL ? "reloadAll" : "use",
};

const SYMBOLS = {
	hash: {
		parameters: ["buffer", "usize", "u32"] as const,
		result: "buffer" as const,
		nonblocking: true,
	},
	verify: {
		parameters: ["buffer", "usize", "buffer", "usize"] as const,
		result: "i8" as const,
		nonblocking: true,
	},
	free_hash: {
		parameters: ["pointer"] as const,
		result: "void" as const,
	},
};

const { symbols } = await dlopen(
	FETCH_OPTIONS,
	SYMBOLS,
);

export function hash(password: string, cost: number): Promise<string> {
	const pwd = encoder.encode(password);
	const raw = symbols.hash(
		pwd.buffer,
		BigInt(pwd.byteLength),
		cost,
	) as Promise<Deno.PointerValue>;
	return raw.then((v) => {
		const lenBuf = new Uint8Array(4);
		const lenView = new DataView(lenBuf.buffer);
		const ptr = new Deno.UnsafePointerView(v!);
		ptr.copyInto(lenBuf, 0);
		const out = new Uint8Array(lenView.getUint32(0));
		ptr.copyInto(out, 4);
		symbols.free_hash(v);
		return decoder.decode(out);
	});
}

export function verify(
	password: string,
	hash: string,
): Promise<number> {
	const pwd = encoder.encode(password);
	const h = encoder.encode(hash);
	return symbols.verify(
		pwd.buffer,
		BigInt(pwd.byteLength),
		h.buffer,
		BigInt(h.byteLength),
	) as Promise<number>;
}
