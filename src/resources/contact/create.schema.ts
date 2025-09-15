import { z } from "zod";
import {
	Sex,
	AUStateOrOVS,
	SACCCode,
	USI,
	LUI,
	SACEStudentID,
	Year,
} from "./primatives";

export const CreateContactQuery = z.object({
	givenName: z.string().max(40),
	surname: z.string().max(40),
	title: z.string().optional(),
	emailAddress: z.email().optional(),
	ContactActive: z.boolean().optional(),
	dob: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/)
		.optional(),
	sex: Sex.optional(),
	middleName: z.string().max(40).optional(),
	phone: z.string().optional(),
	mobilephone: z.string().optional(),
	workphone: z.string().optional(),
	fax: z.string().optional(),
	organisation: z.string().optional(),
	orgId: z.number().int().positive(),
	orgIds: z.array(z.number().int().positive()).max(5).optional(),
	position: z.string().optional(),
	section: z.string().optional(),
	division: z.string().optional(),
	SourceCodeID: z.number().int().positive().optional(),
	HistoricClientID: z.string().optional(),
	USI: USI.optional(),
	LUI: LUI.optional(),
	TFN: z.string().optional(),
	VSN: z.string().optional(),
	WorkReadyParticipantNumber: z.string().optional(),
	SACEStudentID: SACEStudentID.optional(),
	EmergencyContact: z.string().optional(),
	EmergencyContactRelation: z.string().optional(),
	EmergencyContactPhone: z.string().optional(),
	ParentContactID: z.number().int().positive().optional(),

	// Postal
	buildingName: z.string().optional(),
	unitNo: z.string().optional(),
	streetNo: z.string().optional(),
	streetName: z.string().optional(),
	POBox: z.string().optional(),
	address1: z.string().optional(),
	address2: z.string().optional(),
	city: z.string().optional(),
	state: AUStateOrOVS.optional(),
	postcode: z.string().optional(),
	countryID: SACCCode.optional(),
	country: z.string().optional(),

	// Residential
	sbuildingName: z.string().optional(),
	sunitNo: z.string().optional(),
	sstreetNo: z.string().optional(),
	sstreetName: z.string().optional(),
	sPOBox: z.string().optional(),
	saddress1: z.string().optional(),
	saddress2: z.string().optional(),
	scity: z.string().optional(),
	sstate: AUStateOrOVS.optional(),
	spostcode: z.string().optional(),
	scountryID: SACCCode.optional(),
	scountry: z.string().optional(),

	// Term
	termAddress1: z.string().optional(),
	termAddress2: z.string().optional(),
	termCity: z.string().optional(),
	termState: AUStateOrOVS.optional(),
	termPostcode: z.string().optional(),
	termCountryID: SACCCode.optional(),
	termCountry: z.string().optional(),

	// AVETMISS
	CountryofBirthID: SACCCode.optional(),
	CityofBirth: z.string().optional(),
	CountryofCitizenID: SACCCode.optional(),
	CitizenStatusID: z
		.union([
			z.literal(1),
			z.literal(2),
			z.literal(3),
			z.literal(4),
			z.literal(5),
			z.literal(6),
			z.literal(7),
			z.literal(8),
			z.literal(9),
			z.literal(10),
			z.literal(11),
		])
		.optional(),
	ResidencyStatusID: z.number().int().nonnegative().optional(),
	LabourForceID: z.number().int().nonnegative().optional(),
	MainLanguageID: SACCCode.optional(),
	EnglishProficiencyID: z.number().int().nonnegative().optional(),
	EnglishAssistanceFlag: z.boolean().optional(),
	HighestSchoolLevelID: z.number().int().nonnegative().optional(),
	HighestSchoolLevelYear: Year.optional(),
	AtSchoolFlag: z.boolean().optional(),
	AtSchoolName: z.string().optional(),
	PriorEducationStatus: z.boolean().optional(),
	PriorEducationIDs: z.string().optional(),
	DisabilityFlag: z.boolean().optional(),
	DisabilityTypeIDs: z.string().optional(),
	IndigenousStatusID: z.number().int().nonnegative().optional(),
	ANZSCOCode: z.string().optional(),
	ANZSICCode: z.string().optional(),
	SurveyContactStatusCode: z.string().optional(),
	EmailAddressAlternative: z.string().email().optional(),

	employerContactID: z.number().int().positive().optional(),
	payerContactID: z.number().int().positive().optional(),
	supervisorContactID: z.number().int().positive().optional(),
	agentContactID: z.number().int().positive().optional(),
	coachContactID: z.number().int().positive().optional(),
	internationalContactID: z.number().int().positive().optional(),

	optionalID: z.string().optional(),
	categoryIDs: z.array(z.number().int().positive()).optional(),
	domainIDs: z.array(z.number().int().positive()).optional(),

	checkEmailAddressUnique: z.boolean().optional(),
});

const RawCreateContactResponse = z.object({
	EMAILADDRESS: z.string(),
	GIVENNAME: z.string(),
	SURNAME: z.string(),
	CONTACTID: z.number().int().positive(),
});
export const CreateContactResponse = RawCreateContactResponse.transform(
	(r) => ({
		emailAddress: r.EMAILADDRESS,
		givenName: r.GIVENNAME,
		surname: r.SURNAME,
		contactId: r.CONTACTID,
	}),
);
export type CreateContactRequest = z.input<typeof CreateContactQuery>;
export type CreatedContact = z.output<typeof CreateContactResponse>;
