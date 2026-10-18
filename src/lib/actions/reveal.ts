import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { screenReady } from '#lib/screen.ts';

type Options = { delay?: number; stagger?: number };

/**
 * Texte qui monte ligne par ligne, de bas en haut, quand il entre dans l'écran — puis il reste.
 * Il se cache à nouveau seulement quand on remonte au-dessus de lui (il repasse sous l'écran),
 * pour rejouer l'animation la prochaine fois qu'on redescend (comme weareboring).
 * Utilisation : <h2 data-reveal use:reveal>…</h2>   (data-reveal cache le texte avant l'animation)
 * Options : use:reveal={{ delay: 0.15 }}
 */
export function reveal(node: HTMLElement, options: Options = {}) {
	const { delay = 0, stagger = 0.08 } = options;
	let split: SplitText | undefined;
	let lines: Element[] = [];
	let destroyed = false;
	let shown = false;
	const triggers: ScrollTrigger[] = [];

	const show = () => gsap.set(node, { visibility: 'visible' });

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		show();
		return {};
	}

	gsap.registerPlugin(ScrollTrigger, SplitText);

	const hide = () => {
		shown = false;
		gsap.killTweensOf(lines);
		gsap.set(lines, { yPercent: 110 });
	};

	const play = () => {
		if (shown) return;
		shown = true;
		gsap.killTweensOf(lines);
		gsap.to(lines, { yPercent: 0, duration: 1, ease: 'power4.out', delay, stagger });
	};

	(async () => {
		// on laisse le loader / la transition se mettre en place, puis on attend qu'ils libèrent l'écran
		await new Promise((r) => requestAnimationFrame(r));
		await document.fonts.ready;
		await screenReady();
		if (destroyed) return;

		split = SplitText.create(node, {
			type: 'lines',
			mask: 'lines', // chaque ligne dans une fenêtre qui la cache
			autoSplit: true, // re-découpe si la largeur change
			onSplit(self) {
				lines = self.lines;
				gsap.set(lines, { yPercent: shown ? 0 : 110 });
				show();
			}
		});

		triggers.push(
			// Le texte entre dans l'écran → il apparaît, puis il reste
			ScrollTrigger.create({ trigger: node, start: 'top 88%', onEnter: play }),
			// On remonte et le texte repasse complètement sous l'écran → on le cache pour rejouer
			ScrollTrigger.create({ trigger: node, start: 'top bottom', onLeaveBack: hide })
		);
	})();

	return {
		destroy() {
			destroyed = true;
			triggers.forEach((t) => t.kill());
			gsap.killTweensOf(lines);
			split?.revert();
		}
	};
}
