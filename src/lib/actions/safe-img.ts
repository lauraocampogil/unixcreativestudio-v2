/**
 * Image qui ne casse jamais : si elle ne charge pas (Directus lent ou redémarré),
 * on enlève l'icône « image cassée » et on laisse juste le fond (rond, carte…).
 * Fonctionne aussi quand l'erreur arrive avant que Svelte soit prêt (rendu serveur),
 * ce qu'un simple onerror ne rattrape pas.
 * Utilisation : <img use:safeImg src="…" />
 */
export function safeImg(node: HTMLImageElement) {
	const fail = () => {
		node.removeAttribute('src');
		node.removeAttribute('srcset');
		node.dataset.failed = '';
	};
	// Déjà fini mais vide = erreur arrivée avant l'hydratation
	if (node.complete && node.naturalWidth === 0 && node.getAttribute('src')) fail();
	node.addEventListener('error', fail);
	return { destroy: () => node.removeEventListener('error', fail) };
}
