// The three paths. Copy is written for the page, facts come from the spec deck (Sept 2026).
export const PATHS = {
  studio: {
    key: 'studio',
    title: 'Backboard Studio',
    short: 'Studio',
    tagline: 'The desktop IDE with everything built in.',
    bestIf: 'You want to ship an app, not live in a terminal.',
    youGet: ['Memory, models and documents in one window', 'R-CLI harness built in', 'Sign in once, no keys to paste'],
    setup: '2 min',
    cta: 'Download Studio',
    button: 'Sign up and download Studio',
    hackButton: 'Create account and download Studio',
    video: 'lBMDNCyCVjg',
    activation: 'studio_signed_in',
    win: 'Studio is downloaded and signed in.',
    steps: [
      { title: 'Download Studio for your OS', detail: 'Apple Silicon, Intel, Windows or Linux. The download starts immediately.' },
      { title: 'Open it and sign in', detail: 'Studio opens already signed in to this account. No key, no second login.' },
      { title: 'Start a project', detail: 'Pick a model, drop in your docs, and go. Memory is on by default.' },
    ],
    // legacy fields used by the app sign-up screens
    line: 'Desktop IDE with the whole stack built in.',
    bestFor: 'You want an app, not a terminal.',
    bestForInline: 'you want an app, not a terminal.',
    shortLine: 'Desktop IDE, all built in.',
    column: 'The desktop IDE. Memory, 17,000+ models, documents, and the R-CLI harness in one app. Open it, sign in, build.',
  },
  rcli: {
    key: 'rcli',
    title: 'Backboard R-CLI',
    short: 'R-CLI',
    tagline: 'An open-source coding harness for the terminal.',
    bestIf: 'You live in the terminal and want an agent that ships.',
    youGet: ['84.3% on Terminal Bench 2.1', 'Any model, including open ones', 'One curl, one login, first run'],
    setup: '3 min',
    cta: 'Install R-CLI',
    button: 'Sign up and install R-CLI',
    hackButton: 'Create account and install R-CLI',
    video: 'zuXyOX5iqas',
    activation: 'rcli_login_completed',
    win: 'R-CLI is installed and logged in.',
    steps: [
      { title: 'Install', detail: 'One line in your terminal. On Windows, use the PowerShell command instead.', cmd: 'curl -fsSL https://app.backboard.io/api/cli | bash', winCmd: '[PowerShell one-liner from docs]' },
      { title: 'Sign in from the terminal', detail: 'Prints a URL, a short code and a QR code. Approve in the browser and you are in.', cmd: 'backboard login' },
      { title: 'Check the install', detail: 'You should see a version number.', cmd: 'backboard --version' },
    ],
    line: 'Open source recursive coding harness. 84.3% on Terminal Bench 2.1.',
    bestFor: 'You live in the terminal.',
    bestForInline: 'you live in the terminal.',
    shortLine: 'Open source terminal harness.',
    column: 'Open source recursive coding harness. 84.3% on Terminal Bench 2.1, above every published result. Any model, including open ones.',
  },
  api: {
    key: 'api',
    title: 'Unified API',
    short: 'API',
    tagline: 'One key, inside the editor you already use.',
    bestIf: 'You are already in Claude Code, Cursor or VS Code.',
    youGet: ['Memory ranked #1 on LoCoMo and LongMemEval', '17,000+ models behind one key', 'Agentic RAG, threads and tools'],
    setup: '1 min',
    cta: 'Connect your editor',
    button: 'Sign up and connect your editor',
    hackButton: 'Create account and connect your editor',
    video: 'vtt0N5qENW8',
    activation: 'editor_connected',
    win: 'An editor is connected or the first API call landed.',
    steps: [
      { title: 'Pick your editor', detail: 'Claude Code, Cursor or VS Code. Also works with Codex, Windsurf and any MCP client.', harness: true },
      { title: 'Click install', detail: 'Your API key was created for you and is already in the install link.' },
      { title: 'Send your first message', detail: 'Or call it raw with the Python or JavaScript SDK.', cmd: 'pip install backboard-sdk   ·   npm i backboard-sdk' },
    ],
    line: 'One key. Memory, 17,000+ models, RAG, threads. Plugs into the editor you already use.',
    bestFor: 'Claude Code, Cursor, VS Code.',
    bestForInline: 'Claude Code, Cursor, VS Code.',
    shortLine: 'One key in your editor.',
    column: 'One key. Memory (#1 on LoCoMo and LongMemEval), routing across 17,000+ models, agentic RAG, threads, tools. Python and JS.',
  },
}

export const PATH_ORDER = ['studio', 'rcli', 'api']
export const HACKATHON_VIDEO = '8I5QLZTdbXo'

export function isPath(value) {
  return value === 'studio' || value === 'rcli' || value === 'api'
}

export const FAQ = [
  { q: 'Does every teammate get access?', a: 'Yes. Add their emails when you sign up and each of them gets their own account under the same promo code.' },
  { q: 'Can I switch paths later?', a: 'Any time. The path just decides which start page you see first. You can install the others from Settings.' },
  { q: 'I already have a Backboard account.', a: 'Sign in as usual and enter the promo code under Settings → Billing. It applies to your existing account.' },
  { q: 'Where do I submit my project?', a: 'From your start page once you are in, or the Submit link in the footer. Judging criteria are linked there too.' },
]
