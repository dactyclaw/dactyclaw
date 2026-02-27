import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { createAgent, getUserAgents, getAgentByDNA } from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  tokens: router({
    live: publicProcedure.query(async () => {
      try {
        // Fetch live token data from clawn.ch
        const response = await fetch('https://clawn.ch/api/tokens', {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch tokens');
        }
        
        const tokens = await response.json();
        
        // Return top 5 tokens
        return tokens.slice(0, 5).map((token: any) => ({
          name: token.name,
          symbol: token.symbol,
          price: token.price,
          volume_24h: token.volume_24h,
          market_cap: token.market_cap,
          price_change_24h: token.price_change_24h,
          image: token.image,
        }));
      } catch (error) {
        console.error('Error fetching live tokens:', error);
        return [];
      }
    }),
  }),

  agents: router({
    create: protectedProcedure
      .input(
        z.object({
          name: z.string().min(1, "Agent name is required"),
          description: z.string().optional(),
          type: z.enum(["monitor", "trading", "utility", "custom"]),
          githubUsername: z.string().optional(),
          githubRepository: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Generate unique DNA
        const dna = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        
        // Generate wallet address
        const wallet = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        
        // Generate token symbol
        const tokenSymbol = input.name.substring(0, 3).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
        
        const agent = await createAgent({
          userId: ctx.user!.id,
          name: input.name,
          description: input.description,
          dna,
          wallet,
          type: input.type,
          tokenSymbol,
          tokenName: `${input.name} Token`,
          totalSupply: "1000000000000000000000000",
          decimals: 18,
          network: "base",
          status: "created",
          githubUsername: input.githubUsername,
          githubRepository: input.githubRepository,
        });
        
        return {
          success: true,
          agent: {
            dna,
            wallet,
            tokenSymbol,
            name: input.name,
            type: input.type,
          },
        };
      }),
    
    list: protectedProcedure.query(async ({ ctx }) => {
      const userAgents = await getUserAgents(ctx.user!.id);
      return userAgents;
    }),
    
    getByDNA: publicProcedure
      .input(z.object({ dna: z.string() }))
      .query(async ({ input }) => {
        const agent = await getAgentByDNA(input.dna);
        return agent || null;
      }),
  }),
});

export type AppRouter = typeof appRouter;
