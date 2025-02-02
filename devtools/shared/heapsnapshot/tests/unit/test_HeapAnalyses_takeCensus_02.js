/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */
"use strict";

// Test that the HeapAnalyses{Client,Worker} can take censuses with breakdown
// options.

add_task(async function() {
  const client = new HeapAnalysesClient();

  const snapshotFilePath = saveNewHeapSnapshot();
  await client.readHeapSnapshot(snapshotFilePath);
  ok(true, "Should have read the heap snapshot");

  const { report } = await client.takeCensus(snapshotFilePath, {
    breakdown: { by: "count", count: true, bytes: true }
  });

  ok(report, "Should get a report");
  equal(typeof report, "object", "report should be an object");

  ok(report.count);
  ok(report.bytes);

  client.destroy();
});
