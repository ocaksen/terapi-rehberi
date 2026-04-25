# Register as a Psychology Expert

Submit a listing application for a licensed psychologist or therapist to appear on TerapiRehberi's Konya directory.

## Capability

POST an application to /api/basvuru. Applications are reviewed manually; listing is free.

## Endpoint

```
POST https://www.terapirehberi.com/api/basvuru
Content-Type: application/json
```

### Request body

```json
{
  "name":     "string (required) — full name",
  "title":    "string (required) — e.g. Klinik Psikolog, Psikolojik Danışman",
  "email":    "string (required) — contact email",
  "phone":    "string (optional)",
  "city":     "string (required) — e.g. konya",
  "district": "string (required) — e.g. Selçuklu, Meram, Karatay",
  "services": ["string"] ,
  "sessionType": ["Yüz Yüze", "Online"],
  "appointmentUrl": "string (optional) — booking page URL",
  "message":  "string (optional) — additional notes"
}
```

### Response

```json
{ "success": true }
```

## Notes

- For licensed professionals only (Türkiye registered).
- Human-readable form: `https://www.terapirehberi.com/uzman-ol`
- No authentication required to submit.
