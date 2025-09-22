import { describe, it, expect } from "vitest";
import {
	AxcelerateTime,
	AxcelerateTimeLong,
	AxcelerateDate,
	AxcelerateDateTime,
} from "@schemas/fields";

describe("AxcelerateTime", () => {
	it("accepts valid HH:MM", () => {
		expect(AxcelerateTime.parse("00:00")).toBe("00:00");
		expect(AxcelerateTime.parse("23:59")).toBe("23:59");
	});

	it("rejects invalid formats", () => {
		expect(() => AxcelerateTime.parse("24:00")).toThrow();
		expect(() => AxcelerateTime.parse("12:60")).toThrow();
		expect(() => AxcelerateTime.parse("9:05")).toThrow();
	});
});

describe("AxcelerateTimeLong", () => {
	it("accepts valid HH:MM:SS", () => {
		expect(AxcelerateTimeLong.parse("00:00:00")).toBe("00:00:00");
		expect(AxcelerateTimeLong.parse("23:59:59")).toBe("23:59:59");
	});

	it("rejects invalid formats", () => {
		expect(() => AxcelerateTimeLong.parse("24:00:00")).toThrow();
		expect(() => AxcelerateTimeLong.parse("12:05")).toThrow();
		expect(() => AxcelerateTimeLong.parse("12:5:9")).toThrow();
	});
});

describe("AxcelerateDate", () => {
	it("accepts valid YYYY-MM-DD", () => {
		expect(AxcelerateDate.parse("2025-01-01")).toBe("2025-01-01");
		expect(AxcelerateDate.parse("1999-12-31")).toBe("1999-12-31");
	});

	it("rejects invalid formats", () => {
		expect(() => AxcelerateDate.parse("2025-13-01")).toThrow();
		expect(() => AxcelerateDate.parse("2025-00-01")).toThrow();
		expect(() => AxcelerateDate.parse("2025-01-32")).toThrow();
		expect(() => AxcelerateDate.parse("25-01-01")).toThrow();
	});
});

describe("AxcelerateDateTime", () => {
	it("accepts valid YYYY-MM-DD HH:MM", () => {
		expect(AxcelerateDateTime.parse("2025-09-15 00:00")).toBe(
			"2025-09-15 00:00",
		);
		expect(AxcelerateDateTime.parse("1999-12-31 23:59")).toBe(
			"1999-12-31 23:59",
		);
	});

	it("rejects invalid formats", () => {
		expect(() => AxcelerateDateTime.parse("2025-09-15T00:00")).toThrow();
		expect(() => AxcelerateDateTime.parse("2025-09-15 24:00")).toThrow();
		expect(() => AxcelerateDateTime.parse("2025/09/15 12:00")).toThrow();
		expect(() => AxcelerateDateTime.parse("2025-09-15")).toThrow();
	});
});
