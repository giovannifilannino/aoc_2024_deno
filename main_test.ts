import { assertEquals } from "@std/assert";
import { add } from "./day01.ts";

Deno.test(function addTest() {
  assertEquals(add(2, 3), 5);
});