import path from "path";
import { URL } from "url";

export const DOTENV_FILE = path.join(
  new URL(".", import.meta.url).pathname,
  "../../.env",
);
