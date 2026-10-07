# Talks and workshops

Mayank Raj's talks, workshops, slides, demos, and published PDFs.

## Structure

```text
talks/
  <talk-slug>/
workshops/
  ai-watermarking/
    README.md              # Session overview
    slides/                # Editable presentation sources
    demos/                 # Demo code, notebooks, and exercises
    assets/                # Images and media used in the session
    exports/               # Final PDFs, decks, and handouts
    research/              # Local only, ignored by Git
      materials/           # Papers, reference PDFs, and pasted research
      working-notes.md     # Sources, exploration, decisions, and working log
```

Use the same session layout under `talks/<talk-slug>/` or
`workshops/<workshop-slug>/`. Use lowercase names with hyphens.

## Current workshop

- [AI watermarking](workshops/ai-watermarking/README.md)

## Local research

Every folder named `research/` is ignored by Git, including its contents.
Keep exploratory notes, downloaded references, and temporary experiments there.
Move only material intended for publication into the other session folders.

Research folders are local and will not appear in a fresh clone. Recreate them
with `mkdir -p workshops/<workshop-slug>/research/materials` (or the equivalent
under `talks/`). Tracked `.gitkeep` files preserve the other empty folders.

## Adding a session

Create a folder under `talks/` or `workshops/` with a short `README.md` and the
`slides/`, `demos/`, `assets/`, `exports/`, and `research/materials/` folders above.
Keep its research index and working log in `research/working-notes.md`.
