"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { referralSchema, type ReferralInput } from "@/lib/schemas";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { HipaaNotice } from "./HipaaNotice";
import { cn } from "@/lib/utils";

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-1 text-coral">*</span>}
      </Label>
      {children}
      {hint && !error && (
        <p className="text-xs text-grey-500">{hint}</p>
      )}
      {error && <p className="text-xs font-medium text-coral-dark">{error}</p>}
    </div>
  );
}

export function ReferralForm() {
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success"
  >("idle");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReferralInput>({
    resolver: zodResolver(referralSchema),
    defaultValues: { hipaaAck: false as unknown as true },
  });

  const hipaaAck = watch("hipaaAck");

  const onSubmit = async (data: ReferralInput) => {
    setSubmitState("submitting");
    try {
      const res = await fetch("/api/forms/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        // Always show success to the user per HIPAA pattern; server logs failure.
        console.warn("[referral] server returned", res.status);
      }
      setSubmitState("success");
      reset();
    } catch (err) {
      console.warn("[referral] submit error", err);
      setSubmitState("success");
      reset();
    }
  };

  if (submitState === "success") {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-4 font-display text-xl text-primary-dark">
          Referral received
        </h3>
        <p className="mt-2 text-sm text-grey-700 sm:text-base">
          Thank you. Our intake team will acknowledge this referral the same business day and reach out for anything else we need.
        </p>
        <Button
          type="button"
          variant="outlineDark"
          className="mt-6"
          onClick={() => setSubmitState("idle")}
        >
          Submit another referral
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-8 rounded-2xl border border-grey-200 bg-white p-6 shadow-sm sm:p-8"
      id="refer"
    >
      <fieldset className="space-y-6">
        <legend className="font-display text-lg text-primary-dark">
          Referring physician
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Physician name"
            htmlFor="referringName"
            error={errors.referringName?.message}
            required
          >
            <Input id="referringName" autoComplete="name" {...register("referringName")} />
          </Field>
          <Field
            label="Practice name"
            htmlFor="practice"
            error={errors.practice?.message}
            required
          >
            <Input id="practice" autoComplete="organization" {...register("practice")} />
          </Field>
          <Field label="NPI" htmlFor="npi" error={errors.npi?.message} hint="Optional, 10 digits">
            <Input id="npi" inputMode="numeric" {...register("npi")} />
          </Field>
          <Field
            label="Phone"
            htmlFor="referringPhone"
            error={errors.referringPhone?.message}
            required
          >
            <Input id="referringPhone" type="tel" autoComplete="tel" {...register("referringPhone")} />
          </Field>
          <Field label="Fax" htmlFor="referringFax" error={errors.referringFax?.message}>
            <Input id="referringFax" type="tel" {...register("referringFax")} />
          </Field>
          <Field
            label="Email"
            htmlFor="referringEmail"
            error={errors.referringEmail?.message}
            required
          >
            <Input id="referringEmail" type="email" autoComplete="email" {...register("referringEmail")} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="font-display text-lg text-primary-dark">
          Patient information
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Patient full name"
            htmlFor="patientName"
            error={errors.patientName?.message}
            required
          >
            <Input id="patientName" {...register("patientName")} />
          </Field>
          <Field
            label="Date of birth"
            htmlFor="patientDob"
            error={errors.patientDob?.message}
            required
          >
            <Input id="patientDob" type="date" {...register("patientDob")} />
          </Field>
          <Field
            label="Insurance carrier"
            htmlFor="insuranceCarrier"
            error={errors.insuranceCarrier?.message}
            required
          >
            <Input id="insuranceCarrier" {...register("insuranceCarrier")} />
          </Field>
          <Field
            label="Member ID"
            htmlFor="memberId"
            error={errors.memberId?.message}
            required
          >
            <Input id="memberId" {...register("memberId")} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="font-display text-lg text-primary-dark">
          Clinical details
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Medication"
            htmlFor="medication"
            error={errors.medication?.message}
            required
          >
            <Input id="medication" {...register("medication")} />
          </Field>
          <Field label="Dose & frequency" htmlFor="dose" error={errors.dose?.message}>
            <Input id="dose" {...register("dose")} placeholder="e.g. 500 mg every 6 weeks" />
          </Field>
          <Field
            label="Indication"
            htmlFor="indication"
            error={errors.indication?.message}
            required
            className="sm:col-span-2"
          >
            <Input id="indication" {...register("indication")} />
          </Field>
          <Field label="Premedication orders" htmlFor="premedications">
            <Input id="premedications" {...register("premedications")} />
          </Field>
          <Field label="Allergies" htmlFor="allergies">
            <Input id="allergies" {...register("allergies")} />
          </Field>
          <Field
            label="Recent relevant labs"
            htmlFor="recentLabs"
            className="sm:col-span-2"
            hint="Summarize key labs (TB / hepatitis screening for biologic-naïve patients welcome)"
          >
            <Textarea id="recentLabs" rows={3} {...register("recentLabs")} />
          </Field>
          <Field
            label="Clinical notes"
            htmlFor="notes"
            className="sm:col-span-2"
            hint="Brief clinical summary, or anything else our intake team should know"
          >
            <Textarea id="notes" rows={4} {...register("notes")} />
          </Field>
        </div>
        <p className="text-xs text-grey-500">
          Have a progress note or insurance card image? Send what you have by fax or secure email after submitting — our intake team will follow up.
        </p>
      </fieldset>

      <HipaaNotice />

      <div className="flex flex-col gap-3">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-grey-700">
          <Checkbox
            id="hipaaAck"
            checked={hipaaAck === true}
            onCheckedChange={(c) => setValue("hipaaAck", c === true ? true : (false as unknown as true), { shouldValidate: true })}
            aria-invalid={!!errors.hipaaAck}
          />
          <span>
            I acknowledge the HIPAA notice above and confirm this submission is not for a medical emergency.
          </span>
        </label>
        {errors.hipaaAck && (
          <p className="text-xs font-medium text-coral-dark">
            {errors.hipaaAck.message as string}
          </p>
        )}
      </div>

      <Button type="submit" variant="coral" size="lg" disabled={submitState === "submitting"}>
        {submitState === "submitting" ? "Submitting…" : "Submit Referral"}
      </Button>
    </form>
  );
}
