import { MockAgent, setGlobalDispatcher } from "undici";

// Create a mock agent and make it global
const mockAgent = new MockAgent();
mockAgent.disableNetConnect();
setGlobalDispatcher(mockAgent);

// Helper to register mocks per test
export function mockApi(base: string) {
	const pool = mockAgent.get(base);
	return { pool, mockAgent };
}
