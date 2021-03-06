export default function addProtocol(url: $TSFixMeAny): $TSFixMeAny {
	url = url || '';
	let target = url.trim();

	if (!/(?::\/\/)|(?:mailto:)/i.exec(target)) {
		// The validator does not allow URLs starting with just "//", so if there is no "://" or "mailto:" in
		// the target, we can assume the link has no protocol yet, and would erroneously behave like a relative
		// URL.

		target = `http://${target}`;
	}
	return target;
}
