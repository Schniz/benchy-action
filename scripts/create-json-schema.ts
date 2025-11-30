import { FileSchema } from "../src/file-schema";
import { JSONSchema } from "effect";
const jsonSchema = JSONSchema.make(FileSchema);
console.log(JSON.stringify(jsonSchema, null, 2));
