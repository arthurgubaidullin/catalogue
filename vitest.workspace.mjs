import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "catalogue/type",
  "reactive-catalogue/type",
  "catalogue/fake",
  "reactive-catalogue/adapter",
  "program/factory",
  "web-app",
]);
