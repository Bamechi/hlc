import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const indexUrl = new URL("../app/data/hlc-master-index.json", import.meta.url);
const episodes = JSON.parse(await readFile(indexUrl, "utf8"));
const canonicalEpisodes = episodes.filter((episode) => !episode.duplicateOf);

test("ships the complete canonical HLC discovery index", () => {
  assert.equal(episodes.length, 120);
  assert.equal(canonicalEpisodes.length, 107);

  const pillars = [...new Set(canonicalEpisodes.map((episode) => episode.pillar))].sort();
  assert.deepEqual(pillars, ["Arts", "Economics", "Health", "Relationships", "Systems", "Technology", "Vision"]);
});

test("keeps searchable metadata and direct YouTube links on every episode", () => {
  for (const episode of canonicalEpisodes) {
    assert.ok(episode.title);
    assert.ok(episode.guest);
    assert.ok(episode.pillar);
    assert.ok(episode.tags.length > 0);
    assert.match(episode.url, /^https:\/\/www\.youtube\.com\/watch\?v=/);
  }

  const biohackingEpisode = canonicalEpisodes.find((episode) => episode.videoId === "BesRjzDOYYM");
  assert.deepEqual(biohackingEpisode.tags, [
    "Wellness Tech / Biohacking",
    "Health / Wellness / Fitness",
    "Technology / Engineering",
  ]);
});
