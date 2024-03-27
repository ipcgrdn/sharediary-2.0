import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const images = [
  "/placeholder/diary-1.jpeg",
  "/placeholder/diary-2.jpeg",
  "/placeholder/diary-3.jpeg",
  "/placeholder/diary-4.jpeg",
  "/placeholder/diary-5.jpeg",
  "/placeholder/diary-6.jpeg",
  "/placeholder/diary-7.jpeg",
  "/placeholder/diary-8.jpeg",
  "/placeholder/diary-9.jpeg",
  "/placeholder/diary-10.jpeg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identify = await ctx.auth.getUserIdentity();

    if (!identify) {
      throw new Error("권한이 없습니다");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identify.subject,
      authorName: identify.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("권한이 없습니다");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", args.id)
      )
      .unique();

      if (existingFavorite) {
        await ctx.db.delete(existingFavorite._id)
      }

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const title = args.title.trim();

    if (!title) {
      throw new Error("제목을 입력해주세요");
    }

    if (title.length > 60) {
      throw new Error("제목이 너무 길어요");
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

export const favorite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("권한이 없습니다");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("다이어리가 일치하지 않습니다");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    if (existingFavorite) {
      throw new Error("이미 즐겨찾기에 등록되었습니다");
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});

export const unFavorite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("권한이 없습니다");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("다이어리가 일치하지 않습니다");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("즐겨찾기를 확인할 수 없습니다");
    }

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});

export const get = query({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const board = ctx.db.get(args.id)

    return board;
  },
});