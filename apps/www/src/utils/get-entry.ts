import { registry } from "./shared";

export function getEntry<K extends keyof typeof registry>(
  path: string,
  { collection }: { collection: K }
): (typeof registry)[K][number] | undefined {
  return registry[collection].find((entry) => entry._path === path) as
    | (typeof registry)[K][number]
    | undefined;
}
