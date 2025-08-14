function findTextArea() {
	return (
		document.querySelector<HTMLTextAreaElement>('textarea[class*="MuiOutlinedInput-input"]') ??
		document.querySelector<HTMLTextAreaElement>('textarea[class*="MuiInputBase-input"]') ??
		Array.from(document.querySelectorAll<HTMLTextAreaElement>("textarea[class]")).find(
			({ className }) =>
				className.includes("MuiOutlinedInput-input") || className.includes("MuiInputBase-input"),
		) ??
		null
	);
}

function findSubmitButton() {
	return (
		document.querySelector<HTMLButtonElement>('button[aria-label="submit message"]') ||
		Array.from(
			document.querySelectorAll<HTMLButtonElement>('button[class*="MuiIconButton-root"]'),
		).find((btn) => btn.getAttribute("aria-label") === "submit message") ||
		null
	);
}

function handleKeyDown(event: KeyboardEvent) {
	if (event.key !== "Enter") {
		return;
	}

	event.preventDefault();

	const submitButton = findSubmitButton();
	if (submitButton) {
		submitButton.click();
		console.log("Sky Keyboard: Message submitted via Enter key");
	}
}

function setupEnterKeyListener() {
	const textArea = findTextArea();

	if (textArea) {
		textArea.addEventListener("keydown", handleKeyDown);
		console.log("Sky Keyboard Extension: Enter key listener added");
		return true;
	}

	return false;
}

const setupSuccess = setupEnterKeyListener();

if (!setupSuccess) {
	const observer = new MutationObserver((mutations: readonly MutationRecord[]) => {
		const relevantChange = mutations.some((mutation) => {
			const addedNodes = Array.from(mutation.addedNodes);

			return addedNodes.some((node) =>
				node.nodeType === Node.ELEMENT_NODE && node instanceof Element
					? node.matches("textarea") || node.querySelector("textarea") !== null
					: false,
			);
		});

		if (relevantChange && setupEnterKeyListener()) {
			observer.disconnect();
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
}
