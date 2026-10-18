import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Timeline qui « s'allume » au scroll : la 1re étape est en couleur, les suivantes en gris,
 * et chacune se colore quand on arrive dessus. La ligne entre deux étapes se remplit en même temps.
 * Utilisation : <ol use:steps> avec des <li data-step>, et dans chaque li :
 *   .step-flower (la fleur), .step-text (les textes), .step-line-fill (le remplissage de la ligne)
 */
export function steps(node: HTMLElement) {
	gsap.registerPlugin(ScrollTrigger);
	const items = [...node.querySelectorAll<HTMLElement>('[data-step]')];
	if (!items.length) return {};

	// La 1re étape est toujours allumée
	items[0].classList.add('is-active');

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		items.forEach((li) => li.classList.add('is-active'));
		node.querySelectorAll<HTMLElement>('.step-line-fill').forEach((l) => (l.style.transform = 'none'));
		return {};
	}

	const ctx = gsap.context(() => {
		items.forEach((li, i) => {
			// L'étape s'allume quand son haut atteint 65% de l'écran (et s'éteint si on remonte)
			if (i > 0) {
				ScrollTrigger.create({
					trigger: li,
					start: 'top 65%',
					onEnter: () => li.classList.add('is-active'),
					onLeaveBack: () => li.classList.remove('is-active')
				});
			}
			// La ligne sous l'étape se remplit jusqu'à l'étape suivante
			const fill = li.querySelector<HTMLElement>('.step-line-fill');
			const next = items[i + 1];
			if (fill && next) {
				gsap.fromTo(
					fill,
					{ scaleY: 0 },
					{
						scaleY: 1,
						ease: 'none',
						scrollTrigger: { trigger: li, start: 'top 65%', endTrigger: next, end: 'top 65%', scrub: true }
					}
				);
			}
		});
	}, node);

	return {
		destroy() {
			ctx.revert();
		}
	};
}
