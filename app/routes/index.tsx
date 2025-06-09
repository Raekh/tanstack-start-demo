import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getCount, updateCount } from "../functions";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => await getCount(),
});

function RouteComponent() {
  const state = Route.useLoaderData();
  const router = useRouter();

  return (
    <button
      onClick={() => {
        updateCount({ data: 2 }).then(() => router.invalidate());
      }}
    >
      Add 1 to {state}
    </button>
  );
}
