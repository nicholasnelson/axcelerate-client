import { AxcelerateResource } from "../../AxcelerateResource";
import { endpoint } from "../_registry";
import { axcelerateMethod } from "../../AxcelerateMethod";
import { CreateContactQuery, CreateContactResponse } from "./create.schema";
import { GetContactPathParams, GetContactResponse } from "./get.schema";
import { SearchContactsQuery, SearchContactsResponse } from "./search.schema";
import { UpdateContactBody, UpdateContactResponse } from "./update.schema";
import { VerifyUSIBody, VerifyUSIResponse } from "./verifyUsi.schema";

@endpoint("contact")
export class Contact extends AxcelerateResource {
	create = axcelerateMethod(CreateContactQuery, CreateContactResponse, {
		method: "POST",
		path: "/contact/",
	});

	get = axcelerateMethod(GetContactPathParams, GetContactResponse, {
		method: "GET",
		path: "/contact/:contactId",
	});

	update = axcelerateMethod(UpdateContactBody, UpdateContactResponse, {
		method: "PUT",
		path: "/contact/:contactId",
	});

	search = axcelerateMethod(SearchContactsQuery, SearchContactsResponse, {
		method: "GET",
		path: "/contacts/search",
	});

	verifyUsi = axcelerateMethod(VerifyUSIBody, VerifyUSIResponse, {
		method: "POST",
		path: "/contact/verifyUSI",
	});
}
