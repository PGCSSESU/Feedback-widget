import { createRouter, createRoute, AnyRoute } from "@tanstack/react-router";

const rootRoute = createRoute({
  id: "root",
  getParentRoute: function (): AnyRoute {
    throw new Error("Function not implemented.");
  }
});
export const router = createRouter({
  routeTree: rootRoute,
});
