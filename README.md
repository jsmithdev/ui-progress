# ui-progress

LWC w/ ProgressBar.js for line, circle, semi or custom progress UI(s)

<img src="https://media.giphy.com/media/dUB2nhsaUpidXTcssA/giphy.gif"/>

## APIs

| API        | Options (default)            | Description                                          |
| ---------- | ---------------------------- | ---------------------------------------------------- |
| progress   | 0 to 100 [required]          | Count of progress is                                 |
| type       | (line), circle, semi, custom | Type of progress UI                                  |
| text       | (false)                      | Adding the `text` attribute shows text               |
| width      | (200px)                      | Hex code color of the line / progress                |
| color      | (#1d07e8)                    | Hex code color of the line / progress                |
| background | (#EEE)                       | Hex code color of track the line / progress follows  |
| custom-svg |                              | String value of a custom svg (see note below)        |

> Type `custom` needs `custom-svg` to be a string value of your custom svg. The path in the svg that should be the track of the progress line needs `class="progress"`. Not being able to use a `slot` has to do with an LWC limitation of DOM manipulation. See the demo for custom svg example.

## Deploy

todo ~~Click to deploy can be done at [https://component.land?share=jsmithdev%2Fui-progress](https://component.land?share=jsmithdev%2Fui-progress)~~

### SFDX

Covert with SFDX; This creates a folder called `deploy`

```bash
sfdx force:source:convert -r force-app/main/default/lwc/uiProgress -d deploy
```

- Use `sfdx force:source:convert -r force-app -d deploy` instead to deploy the demo component as well

Now you can deploy from the resulting `deploy` directory

```bash
sfdx force:mdapi:deploy -d deploy -w -1 --verbose
```

📌 Above deploys to the default org set

- Add -u user@domain.com or -u alias to deploy else where

Results should more or less mirror below

```bash
DEPLOY PROGRESS | ████████████████████████████████████████ | 2/2 Components

=== Deployed Source
Type                      File                    Name            Id
────────────────────────  ──────────────────────  ──────────────  ──────────────────
                          zip/package.xml         package.xml
LightningComponentBundle  zip/lwc/uiProgress      uiProgress      0Rb1U000000kb5qSAA
```


---

coded while petting a 🐶 by [Jamie Smith](https://jsmith.dev)