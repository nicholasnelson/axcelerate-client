import { AxcelerateResource } from "../AxcelerateResource";
import { ContactsSearchQuery, ContactList } from "./contact.schema";
import { endpoint } from "./_registry";
import { axcelerateMethod } from "../AxcelerateMethod";

@endpoint("contact")
export class Contact extends AxcelerateResource {
	list = axcelerateMethod(ContactsSearchQuery, ContactList, {
		method: "GET",
		path: "/contacts/search",
	});
}
