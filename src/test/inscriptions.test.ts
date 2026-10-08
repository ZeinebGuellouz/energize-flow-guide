import { describe, it, expect, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { duplicateIds, missingFields } from "@/lib/inscriptions";

describe("inscriptions", () => {
  it("flags missing name and short phone", () => {
    const m = missingFields({ id: "1", prenom: "A", email: "a@b.fr", telephone: "07451740", date_rdv: "2026-10-10", creneau: "10:00" });
    expect(m).toContain("Nom");
    expect(m).toContain("Téléphone invalide");
  });
  it("flags same phone as duplicate but not shared email alone", () => {
    const d = duplicateIds([
      { id: "a", prenom: "X", nom: "Y", email: "s@x.fr", telephone: "0600000001" },
      { id: "b", prenom: "Z", nom: "W", email: "s@x.fr", telephone: "0600000002" },
      { id: "c", prenom: "Q", nom: "R", email: "q@x.fr", telephone: "06 00 00 00 01" },
    ]);
    expect([...d].sort()).toEqual(["a", "c"]);
  });
});
