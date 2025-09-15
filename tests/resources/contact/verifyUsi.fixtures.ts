export const usiSuccess = {
	USI_VERIFIED: true,
	DATA: {
		usiStatus: "Valid",
		firstName: "MATCH",
		familyName: "MATCH",
		dateOfBirth: "MATCH",
	},
	MSG: "USI Verified successfully",
};

export const usiMismatch = {
	USI_VERIFIED: false,
	DATA: {
		usiStatus: "Valid",
		firstName: "NO_MATCH",
		familyName: "MATCH",
		dateOfBirth: "MATCH",
	},
	MSG: "USI Valid but the student's personal data does not match. This must be fixed before their USI can be marked as verified. Please check: First Name. ",
};

export const usiMissingData = {
	USI_VERIFIED: false,
	MSG: "An error exists for this contact and must be corrected before calling the USI Service. Date of birth is required. ",
};
