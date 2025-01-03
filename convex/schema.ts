import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  thumbnail: defineTable({
    title: v.string(),
    userId: v.string(),
    aImage: v.string(),
    bImage: v.string(),
  }),
});