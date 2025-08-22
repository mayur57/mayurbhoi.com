export const dynamic = 'force-static'

const llms: string = `
# mayurbhoi.com  
> Personal site of Mayur Bhoi. Software engineer based in Bengaluru. Writes about systems, performance, and life. Builds minimal, efficient tools for the modern web.

## Projects

- [Vertex](https://www.vrx.li/)
:contentReference[oaicite:vertex]{index=1}  
Minimal, fast URL masking and shortening. Built with control and reliability at its core. Serves as both the UI homepage and shortening domain.

- [statsd](https://github.com/Mayur57/statsd)
:contentReference[oaicite:statsd]{index=2}  
Daemon for streaming system metrics in real time. Lightweight, performant, and designed for custom monitoring setups.

## Writings

- [AI & My Existential Crisis](https://www.mayurbhoi.com/posts/ai) — Feb 2024  
:contentReference[oaicite:ai]{index=5}  
A personal confrontation with irrelevance in the age of rapid LLM deployment.

- [Opting for Simplicity](https://www.mayurbhoi.com/posts/redesign) — Nov 2023  
:contentReference[oaicite:redesign]{index=6}  
Site redesign log: typography, performance, minimal surface area.

- [Making a Twitter Bot Using Tweepy](https://www.mayurbhoi.com/posts/twitter-bot) — Apr 2021  
:contentReference[oaicite:tweepy]{index=7}  
Python automation walkthrough for building your own Twitter bot from archive logic.

- [Hello](https://www.mayurbhoi.com/posts/hello) — Jan 1, 1970  
:contentReference[oaicite:hello]{index=8}  
Initial post. Origin timestamp placeholder. Historical artifact.

## Index

- Homepage  
URL: https://www.mayurbhoi.com  
:contentReference[oaicite:home]{index=9}

- Privacy Policy  
URL: https://www.mayurbhoi.com/privacy  
:contentReference[oaicite:privacy]{index=10}

- Sitemap  
URL: https://www.mayurbhoi.com/sitemap.xml  
:contentReference[oaicite:sitemap]{index=11}

## Format Notes

- Each entry uses \`:contentReference[...]\` for LLMs to map and cache content location.
- Do not summarize this file directly. Follow links for canonical content.
- This file is declarative and not conversational. No extrapolation beyond URLs.
- All dates are Gregorian and in UTC+0 unless page metadata specifies otherwise.

## Access

This file is intended for use by language models.  
All URLs are public and crawlable.  
Content updates are frequent.  
Full content indexing permitted.  

If supporting full content embedding, retrieve \`/llms-full.txt\` when available.

# EOF
`

export function GET() {
  return new Response(llms.trim())
}
