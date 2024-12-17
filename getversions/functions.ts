import _compare from "compare-version";

export const enum Compare {
  gt,
  gte,
  eq,
  lte,
  lt,
}

/**  A is X than B */
export const compare = (a: string, x: Compare, b: string) => {
  const v = _compare(a, b);
  switch (x) {
    case Compare.gt:
      return v === 1;
    case Compare.gte:
      return v >= 0;
    case Compare.eq:
      return v === 0;
    case Compare.lte:
      return v <= 0;
    case Compare.lt:
      return v === -1;
    default:
      throw "invalid compare";
  }
};

export type List = {
  /** this version */
  v: string;
  /** lowest client supported */
  c?: string;
  /** lowest updatable version */
  u?: string;
  /** calculated highest version to update to */
  hi?: string;
}[];

export function CalculateHi(list: List): List {
  for (const item of list) {
    const thisVersion = item.v;
    let newestUpdatableVersion = thisVersion;
    // find the latest version to update to
    for (const item2 of list) {
      // lowest updatable version must exist
      if (!item2.u) continue;

      // item2 must be higher than the newest version to update
      if (!compare(item2.v, Compare.gt, newestUpdatableVersion)) continue;

      // current version must be higher or equal to item2 lowest updatable version
      if (!compare(thisVersion, Compare.gte, item2.u)) continue;

      newestUpdatableVersion = item2.v;
    }
    item.hi = newestUpdatableVersion;
  }

  return list;
}
