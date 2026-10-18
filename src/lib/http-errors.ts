// Messages affichés sur la page d'erreur (+error.svelte), par code HTTP.
// Le site est en anglais : les textes sont traduits depuis ta liste.
export const httpErrors: Record<number, string> = {
	// 4xx - Erreurs client
	400: 'The request is invalid or badly formed.',
	401: 'You need to sign in to see this page.',
	402: 'Payment required.',
	403: "Access denied. You don't have permission to see this page.",
	404: 'This page is missing or something went wrong',
	405: 'This HTTP method is not allowed here.',
	406: 'The requested content is not acceptable.',
	407: 'Proxy authentication required.',
	408: 'The server timed out waiting for the request.',
	409: 'This conflicts with the current state of the page.',
	410: 'This page has been permanently removed.',
	411: 'The content length must be specified.',
	412: 'A condition of the request was not met.',
	413: 'The request is too large to be processed.',
	414: 'The URL is too long.',
	415: 'This media type is not supported.',
	416: 'The requested range is not available.',
	417: 'The expectation in the header could not be met.',
	418: "I'm a teapot. ☕",
	421: "The request was sent to a server that can't answer it.",
	422: "The request is correct but can't be processed.",
	423: 'This page is locked.',
	424: 'The request failed because another request failed.',
	425: 'The server refuses a request that could be replayed.',
	426: 'A protocol upgrade is required.',
	428: 'A precondition is required for this request.',
	429: 'Too many requests. Please try again later.',
	431: 'The request headers are too large.',
	451: 'Unavailable for legal reasons.',

	// 5xx - Erreurs serveur
	500: 'Something went wrong on our side.',
	501: "This feature isn't available yet.",
	502: 'The server received an invalid response.',
	503: 'The site is temporarily unavailable.',
	504: "The server didn't respond in time.",
	505: 'HTTP version not supported.',
	506: 'Content negotiation error.',
	507: 'Not enough storage on the server.',
	508: 'An infinite loop was detected.',
	510: 'More extensions are required.',
	511: 'Network authentication required.'
};

// Titre sous le gros numéro
export const errorTitle = (status: number) =>
	status === 404 ? 'Page not found' : status >= 500 ? 'Server error' : 'Something went wrong';
