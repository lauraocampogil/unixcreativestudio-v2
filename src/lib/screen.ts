// Savoir si l'écran est couvert (loader, transition de page).
// Les animations de texte attendent que l'écran soit découvert avant de démarrer.
let busy = 0;
let waiters: (() => void)[] = [];

export const screen = {
	cover() {
		busy++;
	},
	uncover() {
		busy = Math.max(0, busy - 1);
		if (!busy) waiters.splice(0).forEach((fn) => fn());
	}
};

export const screenReady = () =>
	busy ? new Promise<void>((resolve) => waiters.push(resolve)) : Promise.resolve();
