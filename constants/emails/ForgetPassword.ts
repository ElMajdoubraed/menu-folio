const EmailTemplate = (link: string) => {
  return `
<div style="background-color: #010b13; color: white; padding: 2rem">
  <div style="margin: auto; width: 50%">
    <h1 style="color: #d3af37">MenuFolio - Reset Password Request</h1>
    <div style="margin-bottom: 4rem">
      <p style="font-size: large; margin-bottom: 4rem, color: #fff;">
        You are receiving this email because we received a password reset request for your account.
      </p>
        <div style="margin-bottom: 4rem">
            <a
                style="
                margin-bottom: 4rem;
                text-decoration: none;
                padding: 0.75rem 1.2rem;
                background: #d3af37;
                color: #010b13;
                cursor: pointer;
                border: 1px solid #d3af37;
                border-radius: 0.4rem;
                "
                href=${link}
                target="_blank"
                >Reset Password
            </a>
        </div>
      <div>
        <img
          style="margin-bottom: 4rem; color: #d3af37"
          src="https://raed.elmajdoub.live/raed_elmajdoub_logo_email.png"
          width="80"
          height="80"
        />
      </div>
      <a
        style="
          margin-bottom: 4rem;
          color: #d3af37;
          cursor: pointer;
        "
        href="https://menu.elmajdoub.live"
        target="_blank"
        >Back to Website
      </a>
    </div>
    <div style="margin-bottom: 2rem">
      <div style="margin-top: 2rem">
        <b>Have a great day!</b>
      </div>
      <small style="color: #d3af37">MenuFolio Team.</small>
    </div>
  </div>
</div>
`;
};
const EmailSubject = "MenuFolio - Reset Password Request";

export { EmailSubject, EmailTemplate };
