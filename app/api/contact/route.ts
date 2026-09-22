import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "The form submission was invalid." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const website = typeof payload.website === "string" ? payload.website.trim() : "";

  // Silently accept bot submissions caught by the honeypot.
  if (website) return NextResponse.json({ message: "Message received." });

  if (!name || name.length > 100 || !emailPattern.test(email) || email.length > 254) {
    return NextResponse.json(
      { message: "Please check your name and email address, then try again." },
      { status: 400 },
    );
  }

  if (!message || message.length > 5000) {
    return NextResponse.json(
      { message: "Please enter a message between 1 and 5,000 characters." },
      { status: 400 },
    );
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      {
        message:
          "The contact form is temporarily unavailable. Please email ibraheemolawale10@gmail.com directly.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New portfolio enquiry from ${name}`,
        from_name: "Ibraheem Olawale Portfolio",
        name,
        email,
        message,
      }),
      cache: "no-store",
    });

    const result = (await response.json()) as { success?: boolean };

    if (!response.ok || !result.success) {
      return NextResponse.json(
        {
          message:
            "Your message could not be delivered. Please try again or use the email link beside the form.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: "Your message was sent successfully." });
  } catch {
    return NextResponse.json(
      {
        message:
          "The contact service could not be reached. Please try again or use the email link beside the form.",
      },
      { status: 502 },
    );
  }
}
