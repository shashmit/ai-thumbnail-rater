import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
    args: {
      // ...
    },
    handler: async (ctx, args) => {
      // use `args` and/or `ctx.auth` to authorize the user
      // ...
   
      // Return an upload URL
      return await ctx.storage.generateUploadUrl();
    },
  });

export const getStorageUrl = mutation({
    args: {
      storageId: v.string(),
    },
    handler: async (ctx, args) => {
      // use `args` and/or `ctx.auth` to authorize the user
      // ...
   
      // Return the URL of the file
      return await ctx.storage.getUrl(args.storageId);
    },
  });