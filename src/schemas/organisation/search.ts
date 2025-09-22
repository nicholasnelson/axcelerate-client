import type { QueryEndpointSchemas } from "@schemas/meta";
import { z } from "zod";

import { Pagination } from "@schemas/fields";

export const SearchOrganisationsQuery = z
	.object({
		search: z.string().optional(),
		active: z.boolean().optional(),
	})
	.extend(Pagination.shape);

const OrganisationDetail = z
	.object({
		DETAILID: z.number().int().nullable(),
		ORGID: z.number().int().nullable(),
		TYPE: z.string().nullable(),
		PHONE: z.string().nullable(),
		FAX: z.string().nullable(),
		EMAILADDRESS: z.string().nullable(),
		WEBSITE: z.string().nullable(),
		ADDRESS1: z.string().nullable(),
		ADDRESS2: z.string().nullable(),
		CITY: z.string().nullable(),
		STATE: z.string().nullable(),
		POSTCODE: z.string().nullable(),
		COUNTRY: z.string().nullable(),
		ADDRESSLINE1: z.string().nullable(),
		ADDRESSLINE2: z.string().nullable(),
	})
	.partial();

const OrganisationParent = z
	.object({
		HIERACHYDEPTH: z.number().int().nullable(),
		HIERACHYPATH: z.string().nullable(),
		NWDF_ORGSIZEBRACKET: z.string().nullable(),
		ORGNAMEACCOUNTING: z.string().nullable(),
		PURCHASEORDERREQUIRED: z.union([z.number().int(), z.boolean()]).nullable(),
		BOOKING_NOTES: z.string().nullable(),
		LEGALNAME: z.string().nullable(),
		FINANCESYSTEMCARDID: z.string().nullable(),
		HIERACHYROOT: z.number().int().nullable(),
		PAYERCONTACTID: z.number().int().nullable(),
		NAME: z.string().nullable(),
		ORGID: z.number().int().nullable(),
		EMPLOYERCONTACTID: z.number().int().nullable(),
		ABN: z.string().nullable(),
		ANZSIC: z.string().nullable(),
		PARENTORGID: z.number().int().nullable(),
		ORGANISATIONNOTES: z.string().nullable(),
	})
	.partial();

const RawOrganisation = z.object({
	ROWID: z.number().int().positive(),
	ORGID: z.number().int().positive(),
	ORGOPTIONALID: z.string().nullable().optional(),
	NAME: z.string(),
	LEGALNAME: z.string().nullable().optional(),
	ANZSIC: z.string().nullable().optional(),
	ORGANISATIONNOTES: z.string().nullable().optional(),
	HIERACHYROOT: z.number().int().nullable().optional(),
	HIERACHYPATH: z.string().nullable().optional(),
	HIERACHYDEPTH: z.number().int().nullable().optional(),
	SCHOOLTYPEID: z.string().nullable().optional(),
	BOOKING_NOTES: z.string().nullable().optional(),
	FINANCESYSTEMCARDID: z.string().nullable().optional(),
	ORGNAMEACCOUNTING: z.string().nullable().optional(),
	ABN: z.string().nullable().optional(),
	PURCHASEORDERREQUIRED: z
		.union([z.number().int(), z.boolean()])
		.nullable()
		.optional(),
	NWDF_ORGSIZEBRACKET: z.string().nullable().optional(),
	BANNER: z.string().nullable().optional(),
	COUNT: z.number().int().nonnegative().optional(),
	DETAILS: z.array(OrganisationDetail).optional(),
	PARENT: OrganisationParent.optional(),
	PARENTORGID: z.number().int().nullable(),
	PAYERCONTACTID: z.number().int().nullable(),
	EMPLOYERCONTACTID: z.number().int().nullable(),
});

export const SearchOrganisationsResponse = RawOrganisation.transform((org) => ({
	rowId: org.ROWID,
	orgId: org.ORGID,
	orgOptionalId: org.ORGOPTIONALID ?? null,
	name: org.NAME,
	legalName: org.LEGALNAME ?? null,
	anzsic: org.ANZSIC ?? null,
	organisationNotes: org.ORGANISATIONNOTES ?? null,
	hierarchyRoot: org.HIERACHYROOT ?? null,
	hierarchyPath: org.HIERACHYPATH ?? null,
	hierarchyDepth: org.HIERACHYDEPTH ?? null,
	schoolTypeId: org.SCHOOLTYPEID ?? null,
	bookingNotes: org.BOOKING_NOTES ?? null,
	financeSystemCardId: org.FINANCESYSTEMCARDID ?? null,
	orgNameAccounting: org.ORGNAMEACCOUNTING ?? null,
	abn: org.ABN ?? null,
	purchaseOrderRequired:
		typeof org.PURCHASEORDERREQUIRED === "boolean"
			? org.PURCHASEORDERREQUIRED
			: org.PURCHASEORDERREQUIRED === null
				? null
				: org.PURCHASEORDERREQUIRED === 1,
	nwdfOrgSizeBracket: org.NWDF_ORGSIZEBRACKET ?? null,
	banner: org.BANNER ?? null,
	count: org.COUNT ?? null,
	details:
		org.DETAILS?.map((d) => ({
			detailId: d.DETAILID ?? null,
			orgId: d.ORGID ?? null,
			type: d.TYPE ?? null,
			phone: d.PHONE ?? null,
			fax: d.FAX ?? null,
			emailAddress: d.EMAILADDRESS ?? null,
			website: d.WEBSITE ?? null,
			address1: d.ADDRESS1 ?? null,
			address2: d.ADDRESS2 ?? null,
			city: d.CITY ?? null,
			state: d.STATE ?? null,
			postcode: d.POSTCODE ?? null,
			country: d.COUNTRY ?? null,
			addressLine1: d.ADDRESSLINE1 ?? null,
			addressLine2: d.ADDRESSLINE2 ?? null,
		})) ?? [],
	parent: org.PARENT
		? {
				hierarchyDepth: org.PARENT.HIERACHYDEPTH ?? null,
				hierarchyPath: org.PARENT.HIERACHYPATH ?? null,
				nwdfOrgSizeBracket: org.PARENT.NWDF_ORGSIZEBRACKET ?? null,
				orgNameAccounting: org.PARENT.ORGNAMEACCOUNTING ?? null,
				purchaseOrderRequired:
					typeof org.PARENT.PURCHASEORDERREQUIRED === "boolean"
						? org.PARENT.PURCHASEORDERREQUIRED
						: org.PARENT.PURCHASEORDERREQUIRED === null
							? null
							: org.PARENT.PURCHASEORDERREQUIRED === 1,
				bookingNotes: org.PARENT.BOOKING_NOTES ?? null,
				legalName: org.PARENT.LEGALNAME ?? null,
				financeSystemCardId: org.PARENT.FINANCESYSTEMCARDID ?? null,
				hierarchyRoot: org.PARENT.HIERACHYROOT ?? null,
				payerContactId: org.PARENT.PAYERCONTACTID ?? null,
				name: org.PARENT.NAME ?? null,
				orgId: org.PARENT.ORGID ?? null,
				employerContactId: org.PARENT.EMPLOYERCONTACTID ?? null,
				abn: org.PARENT.ABN ?? null,
				anzsic: org.PARENT.ANZSIC ?? null,
				parentOrgId: org.PARENT.PARENTORGID ?? null,
				organisationNotes: org.PARENT.ORGANISATIONNOTES ?? null,
			}
		: null,
	parentOrgId: org.PARENTORGID,
	payerContactId: org.PAYERCONTACTID,
	employerContactId: org.EMPLOYERCONTACTID,
}));

export const SearchOrganisationsResponseList = z.array(
	SearchOrganisationsResponse,
);

export const SearchOrganisations = {
	query: SearchOrganisationsQuery,
	responses: {
		200: SearchOrganisationsResponseList,
	},
} satisfies QueryEndpointSchemas;
