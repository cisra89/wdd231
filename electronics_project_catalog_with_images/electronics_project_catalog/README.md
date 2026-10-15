# Electronics Project Catalog — WDD231

## Project purpose
A responsive educational catalog of low-voltage electronics projects. It is built with plain HTML, CSS, and JavaScript.

## Files
- `index.html`: landing page with featured projects.
- `catalog.html`: searchable/filterable catalog, saved favorites, and accessible details modal.
- `form.html`: project suggestion form.
- `thankyou.html`: displays form values with `URLSearchParams`.
- `attributions.html`: credits.
- `data/projects.json`: 17 project objects.
- `scripts/project-data.js`: shared ES module for Fetch API, local storage, and HTML escaping.
- `styles/small.css` and `styles/large.css`: mobile-first responsive styles.

## Run locally
Because the site uses `fetch()` to read JSON and ES modules, open it through a local web server instead of opening HTML files directly.
For example, in VS Code use the Live Server extension if your course rules allow it, or run Python's simple HTTP server from this folder:
`python -m http.server 8000`
Then visit `http://localhost:8000`.

## Before submitting
1. Replace `YOUR-USERNAME` in each `og:url` with your GitHub username and confirm the final repository path.
2. Add your actual public 3–5 minute video URL to the footer of every page after recording it. The video must show your face and the screen.
3. If you add any external images or text, update `attributions.html`.
4. Check all page URLs using the course audit tool and run Lighthouse in mobile mode.
5. Test at 320px, 700px, and 1024px or wider.
6. Add the link to this project in the navigation of your WDD131/WDD231 week 1 page as your assignment specifies.
7. Confirm all requirements against the latest rubric before submitting.
