# Ask a Psychology Question

Submit an anonymous psychology question to TerapiRehberi. Questions are answered by licensed psychologists listed on the platform.

## Capability

POST a question; it appears in the public Q&A feed at /soru-sor once reviewed.

## Endpoint

```
POST https://www.terapirehberi.com/api/soru-sor
Content-Type: application/json
```

### Request body

```json
{
  "question": "string (required) — the question text",
  "category": "string (optional) — topic area, e.g. kaygı, depresyon, ilişki"
}
```

### Response

```json
{ "success": true }
```

## Notes

- Anonymous — no user account or token needed.
- Questions are moderated before publication.
- Browse existing Q&A: `GET https://www.terapirehberi.com/soru-sor`
