export const HIPAA_NOTICE_TEXT = `This form transmits information securely to our office staff. Information you submit is protected under HIPAA and is used only to respond to your inquiry. Please do not include detailed medical records or sensitive health information in this form — for those, we will contact you through a secure channel after you submit.`;

export function HipaaNotice() {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs leading-relaxed text-primary-dark sm:p-5 sm:text-sm">
      <p className="font-semibold">HIPAA notice</p>
      <p className="mt-2 text-grey-700">{HIPAA_NOTICE_TEXT}</p>
      <p className="mt-3 text-grey-700">
        This form is not for medical emergencies. If this is an emergency, please call <strong>911</strong> or go to the nearest emergency department.
      </p>
    </div>
  );
}
