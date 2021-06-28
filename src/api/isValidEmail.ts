const emailUser =
	"[a-z0-9!#$%&'*+/=?^_`{|}~\\-]+(\\.[a-z0-9!#$%&'*+/=?^_`{|}~\\-]+)*";
const emailDomain =
	'([a-z0-9]([a-z0-9-]*[a-z0-9])?\\.)*([a-z0-9]([a-z0-9-]*[a-z0-9]))?';
const emailRegExp = new RegExp(`^(${emailUser}@${emailDomain})$`, 'i');

export default function isValidEmail(url: $TSFixMeAny): $TSFixMeAny {
	return emailRegExp.test(url);
}
