// Helper to normalize list responses from the API
// Supports shapes: Array<T>, { items: T[]; total: number }, and tuple [T[], total]
export type ListResponse<T> = {
	items: T[];
	total: number;
};

export function normalizeListResponse<T>(payload: unknown): ListResponse<T> {
	try {
		// Case 1: already in desired shape
		if (payload && typeof payload === "object" && "items" in payload && Array.isArray((payload as { items: unknown }).items)) {
			const obj = payload as { items: T[]; total?: number };
			const total = typeof obj.total === "number" ? obj.total : obj.items.length;
			return { items: obj.items, total };
		}

		// Case 2: tuple [items, total]
		if (Array.isArray(payload) && payload.length === 2 && Array.isArray(payload[0])) {
			const items = (payload[0] ?? []) as T[];
			const rawTotal = payload[1];
			const total = typeof rawTotal === "number" ? rawTotal : items.length;
			return { items, total };
		}

		// Case 3: plain array
		if (Array.isArray(payload)) {
			return { items: payload as T[], total: (payload as T[]).length };
		}
	} catch {
		// fallthrough to default
	}

	return { items: [], total: 0 };
}
