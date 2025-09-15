// Plucks CUSTOMFIELD_* pairs from API responses.
export const pickCustomFields = (raw: Record<string, unknown>) =>
	Object.fromEntries(
		Object.entries(raw).filter(([k]) => k.startsWith("CUSTOMFIELD_")),
	);
