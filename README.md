https://findiq.notion.site/Code-Challenge-106f8373cb618054949ec6b31a0df469

## Installation

Run `bun install` to install dependencies.

## Usage

Run `bun start` to run the dev process (`bun --bun dev`). Bun's `--bun` mode is required because I used Bun's sqlite api.

## Planned Features

- [x] Create cards
- [x] Browse cards
- [ ] Basic quiz (fixed number of questions, random selection, extra points for speed)
- [ ] Card management (edit, delete, import, export)
- [ ] User stats
- [ ] User profile
- [ ] Card stats
- [ ] Weighted quiz (fixed number of questions, selected based on card stats)
- [ ] Timed quiz (unlimited questions, configurable time limit)

## Open Design Questions

- Should the edit card modal close on save? Leaving it open makes bulk entry nicer but it feels a little awkward to have to click outside when adding a single card.
- Should it be possible to select multiple cards in the card browser? It introduces a lot of state complexity to an otherwise simple system but it would be a great QoL feature for large card libraries

## Known/Expected issues

- When editing a card, saving it will create a new card instead of updating the existing entry in the database
- Failed form submissions return an error status code with no notification to the user
- Overflow is unhandled currently, the intention is for the card browser to expand up to the height of the viewport and to scroll the page down until the card browser fills the page, then scroll the card browser content itself
- Popover API unavailable in Safari
- After registration, login should be automatic

## Notes

#### Time

The changes implemented since the first time repo was submitted took a little over two hours. The edits to the readme and metamanagement of the challenge was outside this time. For ease of testing the user flows and empty card browser states, I completed the login/logout flow on my own time.

#### Priorities

I prioritised the card browser on the profile page and the card component. My next steps would be to fix the issues, then create Playwright tests for the current interactions, look at the results of creating cards en masse, and general limit testing.

Once I was satisfied with coverage on those tests, I would move on to the basic quiz implementation and create an error notification system to communicate failure results to the user.

Finally, I would circle back to add animations for transitioning between the various states. I prefer to leave the animations to later on in the prototyping process because I find small tweaks to designs often have large ramifications for existing animations.

#### Database

I used sqlite so that I could commit the database into this repo, saving some time for you with creating test cards and such. To start from scratch with no cards, you could either create a new user or you can stop the process, delete the `db.sqlite`, and restart the process.
