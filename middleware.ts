import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({

  publicRoutes: [
    '/api/webhook/clerk',
    '/api/uploadthing',
    '/api'
  ],
  ignoredRoutes: [
    '/api/webhook/clerk',
    '/api/uploadthing',
    '/api'
  ]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};