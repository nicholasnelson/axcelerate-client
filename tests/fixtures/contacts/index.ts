import type { z } from "zod";

import {
	CreateContactBody,
	CreateContactResponse,
} from "../../../src/contract/contacts/create.schema";
import {
	CreateContactNoteBody,
	CreateContactNoteResponse,
} from "../../../src/contract/contacts/note.schema";
import { SearchContactsResponse } from "../../../src/contract/contacts/search.schema";
import { UpdateContactBody } from "../../../src/contract/contacts/update.schema";
import { VerifyUSIResponse } from "../../../src/contract/contacts/verifyUsi.schema";
import { GetContactResponse } from "../../../src/contract/contacts/get.schema";

export const createContactBody: z.input<typeof CreateContactBody> = {
	givenName: "Jane",
	surname: "Doe",
	orgId: 42,
};

export const createContactRawResponse: z.input<typeof CreateContactResponse> = {
	EMAILADDRESS: "jane.doe@example.com",
	GIVENNAME: "Jane",
	SURNAME: "Doe",
	CONTACTID: 201,
};

export const updateContactBody: z.input<typeof UpdateContactBody> = {
	givenName: "Janet",
};

export const contactNoteBody: z.input<typeof CreateContactNoteBody> = {
	contactID: 201,
	contactNote: "Contacted about enrolment",
};

export const contactNoteRawResponse: z.input<typeof CreateContactNoteResponse> =
	{
		MESSAGE: "Created",
		STATUS: "SUCCESS",
		NOTEID: 501,
	};

export const verifyUsiRawResponse: z.input<typeof VerifyUSIResponse> = {
	USI_VERIFIED: true,
	DATA: {
		usiStatus: "VALID",
		firstName: "MATCH",
		familyName: "MATCH",
		dateOfBirth: "MATCH",
	},
	MSG: "USI verified",
};

export const contactRawResponse: z.input<typeof GetContactResponse> = {
	CONTACTID: 201,
	GIVENNAME: "Jane",
	SURNAME: "Doe",
	EMAILADDRESS: "jane.doe@example.com",
	SEX: null,
	DOB: "1990-01-01",
	USI: null,
	USI_VERIFIED: false,
	USI_EXEMPTION: false,
	TITLE: "Ms",
	MIDDLENAME: null,
	PREFERREDNAME: null,
	LUI: null,
	TFN_RECORDED: false,
	OPTIONALID: null,
	POSITION: "Manager",
	SECTION: null,
	DIVISION: null,
	ORGANISATION: "Widgets Co",
	ORGID: "42",
	ORGIDS: ["42"],
	BUILDINGNAME: null,
	UNITNO: null,
	STREETNO: null,
	STREETNAME: null,
	POBOX: null,
	ADDRESS1: "123 Street",
	ADDRESS2: null,
	CITY: "Sydney",
	STATE: "NSW",
	POSTCODE: "2000",
	COUNTRYID: 36,
	COUNTRY: "Australia",
	SBUILDINGNAME: null,
	SUNITNO: null,
	SSTREETNO: null,
	SSTREETNAME: null,
	SPOBOX: null,
	SADDRESS1: "123 Street",
	SADDRESS2: null,
	SCITY: "Sydney",
	SSTATE: "NSW",
	SPOSTCODE: "2000",
	SCOUNTRYID: 36,
	SCOUNTRY: "Australia",
	PHONE: null,
	MOBILEPHONE: null,
	WORKPHONE: null,
	FAX: null,
	COMMENT: null,
	WEBSITE: null,
	CITIZENSTATUSID: 1,
	CITIZENSTATUSNAME: "Citizen",
	COUNTRYOFBIRTHID: 36,
	COUNTRYOFBIRTHNAME: "Australia",
	CITYOFBIRTH: "Sydney",
	COUNTRYOFCITIZENID: 36,
	COUNTRYOFCITIZENNAME: "Australia",
	INDIGENOUSSTATUSID: 1,
	INDIGENOUSSTATUSNAME: "No",
	MAINLANGUAGEID: 36,
	MAINLANGUAGENAME: "English",
	ENGLISHPROFICIENCYID: 1,
	ENGLISHASSISTANCEFLAG: false,
	HIGHESTSCHOOLLEVELID: 1,
	HIGHESTSCHOOLLEVELYEAR: "2007",
	CURRENTSCHOOLLEVEL: null,
	ATSCHOOLFLAG: false,
	ATSCHOOLNAME: null,
	PRIOREDUCATIONIDS: [],
	PRIOREDUCATIONNAMES: [],
	DISABILITYFLAG: false,
	DISABILITYTYPEIDS: [],
	DISABILITYTYPENAMES: [],
	LABOURFORCEID: 1,
	LABOURFORCENAME: "Employed",
	EMERGENCYCONTACT: null,
	EMERGENCYCONTACTRELATION: null,
	EMERGENCYCONTACTPHONE: null,
	PARENTCONTACTID: null,
	ANZSCOCODE: null,
	ANZSICCODE: null,
	EMPLOYERCONTACTID: null,
	PAYERCONTACTID: null,
	SUPERVISORCONTACTID: null,
	COACHCONTACTID: null,
	AGENTCONTACTID: null,
	SACESTUDENTID: null,
	CATEGORYIDS: [],
	DOMAINIDS: [],
};

export const searchContactsRawResponse: z.input<typeof SearchContactsResponse> =
	[contactRawResponse];
