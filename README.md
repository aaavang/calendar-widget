# Google Calendar Event Cards for Squarespace

- `calendar-widget.js`: the widget itself (styles and code in one file), hosted anywhere public.
- `footer-injection.example.html`: your settings plus the line that loads the widget; goes in
  Squarespace. Copy it to `footer-injection.html` (git-ignored, since it holds your API key) and
  fill it in.
- `code-block-examples.html`: the one-line Code Blocks you place on pages.
- `test.html` + `serve.ps1`: local testing with your real calendar.
- `demo.html`: open it in a browser to see the widget with sample events.

## 1. Make the calendar public

In Google Calendar, open **Settings → (your calendar) → Access permissions**, check
**Make available to public**, and choose **See all event details**. If you choose
"free/busy" instead, titles and descriptions won't show.

Then go to **Integrate calendar** and copy the **Calendar ID**
(something like `abc123@group.calendar.google.com`, or your Gmail address for your main calendar).

> Tip: make a separate calendar just for public events, so private appointments stay private.

## 2. Get a Google API key (free)

1. Go to https://console.cloud.google.com/ and create a project (e.g. "Website calendar").
2. Open **APIs & Services → Library**, search for **Google Calendar API**, and click **Enable**.
3. Open **APIs & Services → Credentials → Create credentials → API key**.
4. Click the new key to **restrict** it. Anyone can see this key in your page source, so this step matters:
   - **Application restrictions → Websites**, then add:
     - `https://yourdomain.com/*`
     - `https://www.yourdomain.com/*`
     - `https://*.squarespace.com/*` (lets the widget work in the Squarespace editor and preview)
   - **API restrictions → Restrict key → Google Calendar API**
5. Save. It can take a few minutes for the key to start working.

You don't need billing. The free Calendar API quota is far more than a small site uses.

## 3. Add it to Squarespace

**Host the widget file (once per version):**

The recommended free option is GitHub + jsDelivr:

1. Create a **public** GitHub repository named `squarespace-calendar-widget` and add
   `calendar-widget.js`. The `.gitignore` keeps the files that contain your key out of it.
2. Create a release (or tag) named `v1.0.0`.
3. The file is now served at
   `https://cdn.jsdelivr.net/gh/YOUR_GITHUB_USERNAME/squarespace-calendar-widget@v1.0.0/calendar-widget.js`

To ship a change, commit it, tag `v1.0.1`, and update the version in the `<script src>` line in
Squarespace. Pinning a version means a bad change never reaches your site by surprise, and
rolling back is just changing the number back.

Any host that serves `.js` files publicly works too, such as GitHub Pages or Netlify.

**Install in Squarespace (once):**

1. In `footer-injection.html`, check `GCW_DEFAULTS` (key, calendar, color, layout) and set the
   `<script src>` URL to your hosted file.
2. Go to **Settings → Developer Tools → Code Injection**, paste the file into **Footer**, and save.

**On any page:**

1. Edit the page, then **Add Block → Code**. Uncheck **Display Source**.
2. Paste `<div class="gcw"></div>`, or a variation from `code-block-examples.html`. For example,
   `<div class="gcw" data-max-events="3"></div>` gives a homepage teaser. Any `data-` setting
   overrides the site-wide default for that block only.
3. Save, then view the published page in a private window to check it.

Settings changes (calendar, color, labels) are made in Code Injection. Design or code changes go
in `calendar-widget.js` as a new version. Either way, every page updates.

**Layouts** (`layout` default, or `data-layout` per block):
- `carousel` (default): a swipeable row. It shows 1 card with the next one peeking in on narrow
  blocks, then 2, 3 or 4 as the block gets wider. Arrows and page dots appear only when there are
  more events than fit, and a "3 / 12" counter replaces the dots when there are many pages.
- `grid`: all cards visible, wrapping onto new rows.
- `list`: wide rows with the image on the left.

**Plan note:** Code Injection and JavaScript in Code Blocks need a Squarespace Core plan or higher
(the old "Business" tier or above).

**Safe Preview:** Squarespace's Safe Preview runs code in an isolated frame that hides your site's
address from Google, so a restricted key is refused there ("referer null"). That's expected and
doesn't affect visitors. With this two-part setup the Code Block contains no script, so you
normally won't need Safe Preview anyway.

## Testing locally (optional)

Opening the file by double-clicking it won't work with a restricted key, because Google can't
tell which website the request comes from. Serve it from localhost instead:

1. In the API key's Website restrictions, also add `http://localhost:8000/*`.
   You can remove it once you're done testing.
2. In this folder, run `powershell -ExecutionPolicy Bypass -File serve.ps1`
3. Open http://localhost:8000/test.html. It loads `footer-injection.html` the way Squarespace's
   Code Injection would, but swaps in your local `calendar-widget.js` so you can test changes
   before publishing a new version.
   Edit that file and refresh to see changes. Press Ctrl+C in the terminal to stop the server.

## 4. Adding images to events

Use either method (if an event has both, the attachment wins):

**A. Image link in the description (easiest).** Put the link on its own line, like this:

```
image: https://images.squarespace-cdn.com/content/.../ceili-night.jpg
```

The link is used as the card image and hidden from the description visitors read.
These links work:
- Any direct image link ending in `.jpg`, `.png`, `.webp`, or `.gif`
- Squarespace-hosted images. Upload the image to an image block on a hidden page,
  open it, right-click the image, and choose **Copy image address**.
- Google Drive links (`drive.google.com/file/d/...`). The file must be shared as
  **Anyone with the link → Viewer**.

**B. Google Drive attachment.** In the event editor, click the paperclip to attach an image from
Drive. The file must also be shared as **Anyone with the link**.

Events with no image get a colored placeholder. You can also set your own default with
`data-fallback-image`. Broken or private image links fall back to the placeholder too.

**Flyers:** if your images are portrait posters, set `data-image-fit="contain"` so they aren't
cropped. The full flyer then shows on a blurred backdrop.

## Band, caller, cost and other details

The widget doesn't show event descriptions. It shows only the details you write as
`Label: value`, each on its own line:

```
Band: Speed Dial
Caller: Mary O'Neill
Cost: $10 at the door
Tickets: https://www.eventbrite.com/e/12345
Shoes: soft shoes only
```

- **Band** (or Music / Musicians) shows as a highlighted chip under the event name.
- **Caller**, **Teacher** / Instructor and **Cost** / Price / Admission / Tickets get their own
  icons. Any other label (like `Shoes`) also shows, with a generic info icon.
- Links work: a bare link shows as its site name (e.g. `eventbrite.com`) and is clickable in the
  event popup.
- Any other description text is ignored. That includes lines like `7:30 - 9:30pm` and labels in the
  middle of a sentence.

To change icons, ordering or which label gets the highlight, uncomment and edit `fields` in
`GCW_DEFAULTS` in `footer-injection.html`. To show the description text too, set
`showDescription: true` in `GCW_DEFAULTS`, or add `data-show-description="true"` to one block.

## Customizing the look

The quickest change is `data-accent="#yourcolor"`. For more control, edit the variables at the
top of the `<style>` block:

| Variable | Controls |
|---|---|
| `--gcw-card` | card background |
| `--gcw-text` / `--gcw-muted` | main text / secondary text |
| `--gcw-radius` | corner roundness |
| `--gcw-shadow` | card shadow |

Headings and body text automatically use your Squarespace site fonts.

## Troubleshooting

When you're logged in to Squarespace (`*.squarespace.com`), the error message includes the
technical reason. Visitors only see a polite message. You can also check the browser console.

| Error | Fix |
|---|---|
| `403 … referer … blocked` | Add your domain to the key's Website restrictions (step 2.4) |
| `403 … API has not been used / disabled` | Enable the Google Calendar API (step 2.2) |
| `404 Not Found` | Check the calendar ID, and that the calendar is public |
| Events show but no descriptions | Set public access to "See all event details" |
| Drive image shows the placeholder | Share the Drive file as "Anyone with the link" |
