import { createServerFn } from "@tanstack/react-start";
import * as fs from "node:fs";
import * as v from "valibot";

const filePath = "count.txt";

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0"),
  );
}

const valibotSchema = v.union([
  v.pipe(
    v.string(),
    v.transform((d) => parseInt(d)),
  ),
  v.number(),
]);

export const getCount = createServerFn({ method: "GET" }).handler(() => {
  return readCount();
});

export const updateCount = createServerFn({ method: "POST" })
  .validator(valibotSchema)
  .handler(async ({ data }) => {
    const count = await readCount();
    await fs.promises.writeFile(filePath, (count + data).toString());
  });
