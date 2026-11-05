// Contenu de l'accueil en anglais (langue de base).
// C'est aussi le contenu par défaut si Directus est vide ou hors ligne.
export const home = {
	hero: {
		title: 'Plant your idea. Watch your business grow.',
		subtitle:
			'We are a small, friendly studio in Brussels. We build websites and apps, and put AI to work in your business. Clear prices, no tech talk, no stress.'
	},
	titleLine: {
		title: 'You run it. We help it grow'
	},
	whatWeDo: {
		tag: 'What we do?',
		intro:
			"You don't need to know about websites or AI. You just want more clients and more time. That's exactly what we build.",
		items: [
			{
				title: 'People find you',
				text: "Right now, someone near you is searching for what you do, on Google or by asking ChatGPT. Let's make sure your name comes up first, not your competitor's."
			},
			{
				title: 'People trust you',
				text: 'You only get a few seconds to make a good first impression online. We make those seconds count, with a website that feels just like you.'
			},
			{
				title: 'You get your time back',
				text: 'Answering the same questions, chasing quotes, copying data… We hand that work to AI, so you can focus on your clients.'
			}
		]
	},
	services: {
		title: 'Services',
		items: [
			{
				title: 'Web Design & Development',
				problem:
					"Right now, someone is looking for what you do, on Google or in ChatGPT. Without a good website, they choose someone else. Let's make sure they find you and choose you.",
				href: '/services/web-design'
			},
			{
				title: 'AI consulting',
				problem:
					'You lose hours every week on tasks a computer could do. We find your biggest time-waster and build the AI system that takes it off your plate.',
				href: '/services/ai-consulting'
			},
			{
				title: 'Mobile app',
				problem:
					'Your clients spend hours on their phone. An app keeps you one tap away, so they come back to you, not to someone else.',
				href: '/services/mobile-app'
			}
		]
	},
	ourWork: {
		tag: 'Our work',
		title: "Businesses we've helped grow",
		items: [
			{
				name: 'Brussels Summit Academy',
				category: 'Football academy',
				type: 'Website',
				tagline: 'A sporty website that brings in new players',
				image: '',
				href: 'https://brussels-summitacademy.be/'
			},
			{
				name: 'Shiynelly Lashes',
				category: 'Lash studio',
				type: 'Website',
				tagline: 'An elegant website with online booking',
				image: '',
				href: 'https://shiynellylashes.com/'
			},
			{
				name: 'Entraide Bruxelles',
				category: 'Non-profit',
				type: 'Website',
				tagline: "A fresh website that's easy to read",
				image: '',
				href: 'https://www.entraide-bruxelles.be/'
			},
			{
				name: 'Yaniswash',
				category: 'Carwash',
				type: 'Website',
				tagline: 'Book a car wash in a few clicks',
				image: '',
				href: 'https://yaniswash.be'
			},
			{
				name: 'Inesscoach',
				category: 'Football mental coaching',
				type: 'Website',
				tagline: 'Book and pay for a session online',
				image: '',
				href: 'https://www.iness-coach.com/'
			}
		]
	},
	quiz: {
		tag: 'Quiz',
		title: 'Not sure where to start?',
		intro:
			"That's okay, most people aren't. Answer 3 quick questions and we'll point you the right way. No call needed.",
		questionsLabel: 'Questions',
		recommendationLabel: 'Our recommendation',
		cta: "Let's do it"
	},
	// ⚠️ Avis d'exemple : à remplacer par les vrais avis des clients (ou à leur faire valider) avant la mise en ligne
	reviews: {
		label: 'What our client says',
		items: [
			{
				quote:
					'Best designer in town, good job, good person, always listening. Thanks to Unix we have a lot more views from all over.',
				name: 'InessCoach',
				role: 'Founder',
				logo: ''
			},
			{
				quote:
					'Our new website is clear and easy to read for everyone. Families find our activities in a few seconds, and we get more sign-ups every month.',
				name: 'Entraide Bruxelles',
				role: 'Coordinator',
				logo: ''
			},
			{
				quote:
					'Unix understood our academy right away. The website feels sporty and proud, and new players now sign up directly online.',
				name: 'Brussels Summit Academy',
				role: 'Founder',
				logo: ''
			}
		]
	},
	faq: {
		tag: 'FAQ',
		title: 'Good to know',
		text: "Can't find your question? We usually respond on the same day.",
		linkLabel: 'Get in touch',
		linkHref: '/contact',
		items: [
			{
				question: "I don't know what I need. Where do I start?",
				answer: 'With the 3-question quiz. It tells you which service fits and what it costs.'
			},
			{
				question: 'Do I have to call you?',
				answer:
					"Not at all. Form, email or WhatsApp work just fine. We only call if you'd like us to."
			},
			{
				question: 'Can I change the text myself later?',
				answer:
					'Yes. If you like, we add a simple editor so you can change text and photos yourself.'
			},
			{
				question: 'Who owns the website?',
				answer: 'You do. The website, the domain and all accounts are in your name.'
			},
			{
				question: 'What if something breaks?',
				answer: 'For one year after launch, we fix any technical bug for free.'
			},
			{
				question: 'I know nothing about AI. Is that a problem?',
				answer:
					'Not at all. We explain everything in plain words, set it all up for you, and you only see the result: hours saved every week.'
			}
		]
	},
	marquee: {
		items: ['Bloom your business', 'Get found', 'Get clients', 'Save time', 'Stress less']
	}
};

export type HomeContent = typeof home;
