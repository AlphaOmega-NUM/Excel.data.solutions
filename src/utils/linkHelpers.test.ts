import test from "node:test";
import assert from "node:assert/strict";
import { portfolioProjects } from "../data/portfolioProjects";
import { SITE_CONFIG } from "../data/siteConfig";
import {
  filterPortfolioProjects,
  getPortfolioCategories,
  isPlaceholderUrl,
  isSafeExternalUrl,
  resolveConfiguredLink,
} from "./linkHelpers";

test("isPlaceholderUrl detects REPLACE_WITH_ placeholders and empty values", () => {
  assert.equal(isPlaceholderUrl("REPLACE_WITH_DATA_CLEANING_GOOGLE_SHEETS_URL"), true);
  assert.equal(isPlaceholderUrl("REPLACE_WITH_APPROVED_CONTACT_LINK"), true);
  assert.equal(isPlaceholderUrl("   "), true);
  assert.equal(isPlaceholderUrl(undefined), true);
  assert.equal(isPlaceholderUrl("https://docs.google.com/spreadsheets/d/123"), false);
});

test("isSafeExternalUrl accepts valid https, http, and mailto links while rejecting unsafe schemes", () => {
  assert.equal(isSafeExternalUrl("https://docs.google.com/spreadsheets/d/abc123/edit"), true);
  assert.equal(isSafeExternalUrl("http://example.com/contact"), true);
  assert.equal(isSafeExternalUrl("mailto:hello@example.com"), true);
  assert.equal(isSafeExternalUrl("javascript:alert(1)"), false);
  assert.equal(isSafeExternalUrl("REPLACE_WITH_APPROVED_CONTACT_LINK"), false);
  assert.equal(isSafeExternalUrl("not-a-valid-url"), false);
});

test("resolveConfiguredLink handles configured Google Sheets URLs and remaining placeholders", () => {
  assert.equal(portfolioProjects.length, 6);
  const expectedConfiguredUrls: Record<string, string> = {
    "data-cleaning":
      "https://docs.google.com/spreadsheets/d/12Zpm7cxkWq_4XAlEbNfV665BvsVhojVT/edit?usp=drive_link&ouid=100811396853313147691&rtpof=true&sd=true",
    "spreadsheet-organization":
      "https://docs.google.com/spreadsheets/d/1wnYgWfoOeKVQDldTZ0ESsKVhwMNkSccI/edit?usp=drive_link&ouid=100811396853313147691&rtpof=true&sd=true",
    "sales-dashboard":
      "https://docs.google.com/spreadsheets/d/1u9VdRf-o091Ck0isnvLqNFRa6SjLdZoF/edit?usp=drive_link&ouid=100811396853313147691&rtpof=true&sd=true",
    inventory:
      "https://docs.google.com/spreadsheets/d/1PZHDGiPz78d_fpa3jjOdxLucdlPxTFAr/edit?usp=drive_link&ouid=100811396853313147691&rtpof=true&sd=true",
    "business-reporting":
      "https://docs.google.com/spreadsheets/d/1crSJRoCaM4HHrDC9tzNHOyaIKeAPvxNH/edit?usp=drive_link&ouid=100811396853313147691&rtpof=true&sd=true",
    "power-query":
      "https://docs.google.com/spreadsheets/d/1ebSE2Y0euV4QCTYG5rbwTpcnNOfAvmha/edit?usp=drive_link&ouid=100811396853313147691&rtpof=true&sd=true",
  };

  for (const project of portfolioProjects) {
    const resolved = resolveConfiguredLink(project.projectUrl);
    const expectedUrl = expectedConfiguredUrls[project.id];
    assert.ok(expectedUrl, `Expected configured URL for project ${project.id}`);
    assert.equal(resolved.isConfigured, true);
    assert.equal(resolved.href, expectedUrl);
    assert.equal(resolved.placeholderKey, null);
  }

  const contactResolved = resolveConfiguredLink(SITE_CONFIG.contactUrl);
  assert.equal(contactResolved.isConfigured, false);
  assert.equal(contactResolved.placeholderKey, "REPLACE_WITH_APPROVED_CONTACT_LINK");
});

test("resolveConfiguredLink enables external target when a real Google Sheets URL is provided", () => {
  const realUrl = "https://docs.google.com/spreadsheets/d/demo-sheet-id/view";
  const resolved = resolveConfiguredLink(realUrl);
  assert.equal(resolved.isConfigured, true);
  assert.equal(resolved.href, realUrl);
  assert.equal(resolved.placeholderKey, null);
});

test("getPortfolioCategories and filterPortfolioProjects return expected subsets", () => {
  const categories = getPortfolioCategories(portfolioProjects);
  assert.equal(categories[0], "All Projects");
  assert.equal(categories.length, 7);

  const all = filterPortfolioProjects(portfolioProjects, "All Projects");
  assert.equal(all.length, 6);

  const dataCleaning = filterPortfolioProjects(portfolioProjects, "Data Cleaning");
  assert.equal(dataCleaning.length, 1);
  assert.equal(dataCleaning[0].id, "data-cleaning");
});
