import { z } from "zod";

export const Id = z.number().int().positive();
