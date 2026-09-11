// Final card copy and path parameters (spec slide 6). Keep these strings verbatim.
export const PATHS = {
  studio: {
    key: 'studio',
    title: 'Backboard Studio',
    line: 'Desktop IDE with the whole stack built in.',
    bestFor: 'You want an app, not a terminal.',
    bestForInline: 'you want an app, not a terminal.',
    button: 'Sign up and download Studio',
    hackButton: 'Create account and download Studio',
    shortLine: 'Desktop IDE, all built in.',
    column: 'The desktop IDE. Memory, 17,000+ models, documents, and the R-CLI harness in one app. Open it, sign in, build.',
    video: 'lBMDNCyCVjg',
    activation: 'studio_signed_in',
    win: 'Studio is downloaded, then signed in inside Studio.',
  },
  rcli: {
    key: 'rcli',
    title: 'Backboard R-CLI',
    line: 'Open source recursive coding harness. 84.3% on Terminal Bench 2.1.',
    bestFor: 'You live in the terminal.',
    bestForInline: 'you live in the terminal.',
    button: 'Sign up and install R-CLI',
    hackButton: 'Create account and install R-CLI',
    shortLine: 'Open source terminal harness.',
    column: 'Open source recursive coding harness. 84.3% on Terminal Bench 2.1, above every published result. Any model, including open ones.',
    video: 'zuXyOX5iqas',
    activation: 'rcli_login_completed',
    win: 'R-CLI installed and backboard login completed in the terminal.',
  },
  api: {
    key: 'api',
    title: 'Unified API',
    line: 'One key. Memory, 17,000+ models, RAG, threads. Plugs into the editor you already use.',
    bestFor: 'Claude Code, Cursor, VS Code.',
    bestForInline: 'Claude Code, Cursor, VS Code.',
    button: 'Sign up and connect your editor',
    hackButton: 'Create account and connect your editor',
    shortLine: 'One key in your editor.',
    column: 'One key. Memory (#1 on LoCoMo and LongMemEval), routing across 17,000+ models, agentic RAG, threads, tools. Python and JS.',
    video: 'vtt0N5qENW8',
    activation: 'editor_connected',
    win: 'A coding harness is connected (Claude Code, Cursor, VS Code) or the first API call lands.',
  },
}

export const PATH_ORDER = ['studio', 'rcli', 'api']
export const HACKATHON_VIDEO = '8I5QLZTdbXo'

export function isPath(value) {
  return value === 'studio' || value === 'rcli' || value === 'api'
}

// Entry points (spec slide 7). Which ?path= each Backboard property should carry.
export const ENTRY_POINTS = [
  { from: 'backboard.io/products/cli, R-CLI ads, R-CLI dev.to posts, GitHub README', path: 'rcli' },
  { from: 'Studio product page, AWS Marketplace listing, Studio ads', path: 'studio' },
  { from: 'Docs, API quickstart, MLH partner page, API ads, dev.to API posts', path: 'api' },
  { from: 'Homepage header Sign up, footer, generic brand ads', path: null },
  { from: 'app.backboard.io/hackathon', path: 'chosen on page' },
]
