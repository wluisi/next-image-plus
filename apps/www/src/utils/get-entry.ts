import { registry } from "./shared";

export function getEntry<K extends keyof typeof registry>(
  slug: string,
  { collection }: { collection: K }
): (typeof registry)[K][number] | undefined {
  return registry[collection].find((entry) => entry._meta.path === slug) as
    | (typeof registry)[K][number]
    | undefined;
}
