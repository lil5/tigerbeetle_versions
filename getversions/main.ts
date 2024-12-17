import { $ } from "bun";
import { CalculateHi, type List } from "./functions";

const releases: [{ tagName: string }] =
  await $`gh release list --exclude-drafts --exclude-pre-releases --json tagName -R tigerbeetle/tigerbeetle`.json();

const reOldClient = /Oldest supported client version: (\d+\.\d+\.\d+)/;
const reOldUpgrade = /Oldest upgradable replica version: (\d+\.\d+\.\d+)/;

let list: List = [];
for (const release of releases) {
  const releaseView: { body: string } =
    await $`gh release view ${release.tagName} --json body -R tigerbeetle/tigerbeetle`.json();

  const c = reOldClient.exec(releaseView.body)?.at(1);
  const u = reOldUpgrade.exec(releaseView.body)?.at(1);
  list.push({ v: release.tagName, c, u });
}

// generate
list = CalculateHi(list);
const data = JSON.stringify(list);
await Bun.write("output.json", data);
