import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createThumbnail = mutation({
  args: {
    title: v.string(),
    aImage: v.string(),
    bImage: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Not authenticated");
    }
    return await ctx.db.insert("thumbnail", {
      title: args.title,
      userId: user.subject,
      aImage: args.aImage,
      bImage: args.bImage,
    });
  },
});

export const getThumbnailsForUser = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return [];
    }
    return ctx.db
      .query("thumbnail")
      .filter((q) => q.eq(q.field("userId"), user.subject))
      .collect();
  },
});

