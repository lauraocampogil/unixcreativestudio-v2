// Mémoire de la visite (remise à zéro à chaque rechargement complet de la page)
export const visit = {
	// true dès qu'une page service a été ouverte → au retour sur l'accueil,
	// la section Services montre les 4 cards côte à côte
	fromService: false,
	// un lien vers une section (/#faq…) est en cours : services ne doit pas sauter sur sa section
	goingToSection: false,
	// true dès la première navigation dans le site (sans recharger) :
	// le loader ne joue que quand on arrive directement sur l'accueil
	navigated: false
};
