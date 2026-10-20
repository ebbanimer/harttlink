# Hartlink

Interactive React + TypeScript prototype for couples.

## iPhone testing

While the preview server is running, connect the iPhone to the same Wi-Fi as this computer and open the Network URL printed by the preview server in Safari. The computer must remain on. This is a local preview, not a hosted deployment.

## Run

On Windows, double-click `Start Hartlink.cmd` in this folder. Keep its window open and use the **Local** address it prints. This starts the preview directly on your computer rather than inside the assistant's isolated execution session. The launcher starts at port 63472 and chooses another port if it is occupied. For an iPhone on the same Wi-Fi, use the printed **Network** address.

Install dependencies with `npm install`. Build with `npm run build`. Serve the built app with `npx vite preview --host 0.0.0.0 --port 5173`.

Home has rotating daily prompts, completion and saving. Explore includes category filters, activities, quizzes, prompts and guidance. Our Space includes editable names, story and preferences, photo memories, plans and saved content. Couple-focused prompts, date ideas, and a weekly relationship check-in help make time for each other. Chat and sharing are simulated. Data persists in browser localStorage and does not sync between devices.

Test navigation, save a prompt, complete a quiz, share an activity with your partner, edit your relationship, add a memory and plan, then reload to check persistence.

## Where to edit

| File or folder | Purpose |
| --- | --- |
| `src/constants/copy.ts` | Interface text, labels, accessibility labels, and notifications |
| `src/constants/content.ts` | Explore activities, quizzes, articles, daily questions, weekly ritual |
| `src/constants/sampleData.ts` | Starting profiles, memories, plans, and chat messages |
| `src/constants/config.ts` | Storage keys, photo size limit, and toast duration |
| `src/screens/` | Home, Explore, and Our Space screen layouts |
| `src/components/` | Header, navigation, content details, chat, and relationship forms |
| `src/state/ClosebyProvider.tsx` | Makes shared state available to screens and components |
| `src/hooks/useClosebyState.ts` | Application state and actions: saving, sharing, chat, forms, daily prompts |
| `src/hooks/usePersist.ts` | Browser storage adapter |
| `src/types/index.ts` | Shared TypeScript data types |
| `src/utils/` | Date formatting and saved-content lookup |
| `src/style.css` | Visual styles |
| `src/App.tsx` | Connects screens and overlays |
| `src/main.tsx` | App entry point |

### Typical changes

To change a button label, edit `COPY` in `copy.ts`. To add an activity or quiz, add an entry in `items` in `content.ts`, giving it a unique, stable ID. To change starting relationship details, edit `sampleData.ts`.

Sample data is used only when the browser has no existing saved value. To see changed defaults, use a fresh browser profile or clear this app's local storage (this deletes its saved prototype data). Existing storage keys were preserved during the refactor.

Run `npm test` to verify profile migration. Run `npm run format` after editing, `npm run typecheck` to check TypeScript, and `npm run build` for the production build. WebStorm recognizes the scripts in `package.json`.

This remains a browser prototype. A future React Native version can reuse the content, types, and application logic, with new native screen components and a mobile storage adapter.


## Relationship refactor

The shared profile uses `partner` and the personal screen is `RelationshipScreen.tsx`. Existing `closeby-profile` data with a `friend` field is migrated on load; names, dates, preferences, and stories are retained. Memories, plans, and bookmarks retain their original storage keys. The AI companion uses a new key, leaving old partner chat data untouched. New sample content only applies to browsers without saved data.



## Questions and quizzes

- **Questions** are generally invitations for in-person conversations, including the daily prompt and weekly check-in. Funny question packs are an exception: send them in-app and write replies in the question inbox.
- **Quizzes** collect multiple-choice answers in the app and save progress in this browser.
- **Know your partner:** your partner records their own choices, then you guess them. Comparison unlocks after both rounds are submitted; there are no invented correct answers.
- **Would you rather:** both participants choose and compare their answers.
- **Love language:** an original affection-preferences reflection with tied results supported, optional partner participation, and explicit sharing through the partner share sheet. It is not a validated assessment.

The prototype uses one shared device for two participant rounds. It does not authenticate participants or synchronize answers across devices.

Edit quiz definitions in `src/constants/quizzes.ts`, quiz interface text in `src/constants/quizCopy.ts`, result calculations in `src/utils/quizzes.ts`, and the interface in `src/components/QuizRunner.tsx`. Add a `quizId` to the corresponding Explore item in `content.ts`. Keep question and option IDs stable; use a new quiz ID for an incompatible rewrite.


## Start page and calendar

Home includes a small appreciation reminder, based only on the partner’s completed affection-preferences quiz. If no partner result exists, it shows a general gesture and a quiz shortcut. Tied preferences rotate across days, and “I did this” is saved for that local day.

The Calendar tab uses the existing plans collection, so dates added from activities, Our Space, or the calendar all appear together. Select a day, add a date, optionally set a time and note, and edit or remove it from the day’s list. Home also shows the next saved plan. Data remains local to this browser.

Edit reminder ideas and calendar labels in `src/constants/planning.ts`, date helpers in `src/utils/planning.ts`, the reminder in `src/components/AppreciationReminder.tsx`, and the month view in `src/screens/CalendarScreen.tsx`.


## Hartlink companion and funny questions

The floating chat is now **Hartlink AI**, an explicitly labeled offline prototype with scripted, topic-based replies. It does not use an AI model. The adapter is `src/services/assistant.ts`; connect it to a server-side model endpoint for live AI (never embed an API key in the standalone app). Its new storage key keeps old partner messages out of the companion conversation without deleting them.

Partner sharing is separate from the companion. Funny questions under Explore → Questions → Funny can be shuffled and sent to the in-app question inbox. Existing content and quiz-result sharing uses the same partner share sheet. No message is automatically delivered, and no automatic notifications are scheduled.

Edit funny questions in `src/constants/sharing.ts` and companion text in `src/constants/assistant.ts`. Run `npm run build:standalone` to regenerate `../Hartlink.html` and the compatible `../Closeby.html` file. Both have identical current content; browser data for local HTML files may depend on the browser and filename.


## Browse categories

Explore now uses **Date ideas** (formerly Activities). Date categories: At home, Active, Unusual, Outdoors, Budget friendly, and Romantic. Conversation-question categories: Financial, Deep, Funny, Would you rather, Memories, and Future & dreams. Tap a category to view its content, switch topics with the chips, or return to the category grid.

Category labels, icons, and descriptions live in `src/constants/explore.ts`. Additional dates live in `src/constants/dateIdeas.ts`; question packs live in `src/constants/questionPacks.ts`. Assign stable `topics` IDs to each item; one item can appear in several appropriate categories. Existing content IDs are preserved for bookmarks. Playful would-you-rather question packs can be sent through the question inbox, separate from the multiple-choice quiz.


## Three question experiences

- **Questions:** choose a theme (Financial, Deep, Funny, Would you rather, Memories, Future & dreams) for an IRL conversation. These packs have no written answer fields.
- **Quizzes:** choose responses in the app and get results or compare answers.
- **Shuffle questions:** choose Funny, Random, or Cute, shuffle a quick question, and ask your partner during the day. Both answer directly on the question card. These are separate from IRL question packs.

`src/constants/shuffleQuestions.ts` contains the three quick-question pools and their Explore decks. Topic-based conversation packs remain in `questionPacks.ts`; answerable quizzes remain in `quizzes.ts`. Stable IDs preserve bookmarks and existing saved answers. Shuffle questions are sent on demand, with no scheduled notifications.

The question-mark icon opens saved question cards. The local prototype lets you switch names to test both sides on one device; it does not sync between phones. The AI companion remains separate.


## Our Space: dates, timeline, and favorites

Our Space now starts with recurring birthdays and your relationship anniversary. The partner birthday accepts existing English dates such as `April 18`, or `MM-DD` / `YYYY-MM-DD`. Add other annual or one-off important dates, edit or remove them under Manage saved dates, and independently choose in-app reminders a week before and on the day. These reminders appear in Our Space and on Home when the app is opened; they are not OS notifications and cannot alert while the app is closed. Annual dates also appear on the Calendar. February 29 is observed on February 28 in non-leap years.

The timeline supports dated memories and milestones with optional photos, editing, and removal. Existing memories and their text dates are retained. Old memories without an exact day can keep their original date label while editing. Partner favorites include favorite treats, quality time, gift ideas, and notes.

Edit interface strings in `src/constants/ourSpace.ts`, recurrence logic in `src/utils/ourSpace.ts`, and shared storage in `src/hooks/useOurSpace.ts`. The four UI pieces are `ImportantDates`, `ImportantDateReminder`, `MemoryTimeline`, and `PartnerFavorites`. No automatic relationship analysis or relationship score is included.
