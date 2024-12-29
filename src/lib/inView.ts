export default function viewport(element: Element, params={}) {
	let intersectionObserver: IntersectionObserver;
	

	function setObserver(root: HTMLElement | null) {
		if (intersectionObserver) intersectionObserver.disconnect();
	  intersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					const eventName = entry.isIntersecting ? 'enter' : 'exit';
					entry.target.dispatchEvent(new CustomEvent(eventName));
				});
			},
			{
				root: root,
				threshold: [0.8]
			}
		);

		intersectionObserver.observe(element)
	}

	setObserver(element.parentElement)

	return {
		update(){
			setObserver(element.parentElement)
		},
		destroy() {
			if(intersectionObserver){
				intersectionObserver.disconnect()
			}
		}
	}
}
