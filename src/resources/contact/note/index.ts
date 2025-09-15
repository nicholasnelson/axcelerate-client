import { axcelerateMethod } from "../../../AxcelerateMethod";
import { AxcelerateResource } from "../../../AxcelerateResource";
import { endpoint } from "../../_registry";
import {
	CreateContactNoteBody,
	CreateContactNoteResponse,
} from "./note.schema";

@endpoint("contact/note")
export class Note extends AxcelerateResource {
	create = axcelerateMethod(CreateContactNoteBody, CreateContactNoteResponse, {
		method: "POST",
		path: "/contact/note/",
	});
}
