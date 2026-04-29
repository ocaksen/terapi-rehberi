import { Resend } from "resend";

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const FROM_NOREPLY = "TerapiRehberi <noreply@terapirehberi.com>";
export const FROM_BASVURU = "TerapiRehberi Başvuru <noreply@terapirehberi.com>";
