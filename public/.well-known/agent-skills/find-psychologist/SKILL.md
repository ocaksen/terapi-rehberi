# Find Psychologist in Konya

Search TerapiRehberi's directory of licensed psychologists and therapists in Konya, Turkey.

## Capability

Returns verified psychologists filtered by district and/or specialty. Supports `Accept: text/markdown` for agent-friendly output on every page.

## Endpoints

- All Konya listings: `GET https://www.terapirehberi.com/konya`
- By district: `GET https://www.terapirehberi.com/konya/{district}`
  - Districts: `meram`, `selcuklu`, `karatay`
- By specialty: `GET https://www.terapirehberi.com/konya/{specialty}`
  - Specialties: `bireysel-terapi`, `cift-terapisi`, `ergen-psikolojisi`, `aile-terapisi`, `kaygi-bozuklugu`, `emdr`, `cocuk-psikolojisi`
- Expert profile: `GET https://www.terapirehberi.com/uzman/{slug}`
- Full list: `GET https://www.terapirehberi.com/konya/psikologlar`

## Machine-Readable

Add `Accept: text/markdown` to any request for a Markdown representation suitable for LLM context.

## Notes

- All listings are free to access, no authentication required.
- Data: name, title, district, session types (in-person / online), fee, specialties, appointment URL.
