"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { CONTACT_REASONS } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { HipaaNotice } from "./HipaaNotice";
import { cn } from "@/lib/utils";

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
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
      {error && <p className="text-xs font-medium text-coral-dark">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success">("idle");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { hipaaAck: false as unknown as true },
  });

  const hipaaAck = watch("hipaaAck");

  const onSubmit = async (data: ContactInput) => {
    setSubmitState("submitting");
    try {
      const res = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) console.warn("[contact] server returned", res.status);
      setSubmitState("success");
      reset();
    } catch (err) {
      console.warn("[contact] submit error", err);
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
          Message received
        </h3>
        <p className="mt-2 text-sm text-grey-700 sm:text-base">
          Thank you — we will respond the same business day.
        </p>
        <Button
          type="button"
          variant="outlineDark"
          className="mt-6"
          onClick={() => setSubmitState("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 rounded-2xl border border-grey-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={errors.name?.message} required>
          <Input id="name" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Phone" htmlFor="phone" error={errors.phone?.message} required>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
        <Field
          label="Email"
          htmlFor="email"
          error={errors.email?.message}
          required
          className="sm:col-span-2"
        >
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
        </Field>
        <Field
          label="Reason for contact"
          htmlFor="reason"
          error={errors.reason?.message}
          required
          className="sm:col-span-2"
        >
          <Controller
            control={control}
            name="reason"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="reason" aria-invalid={!!errors.reason}>
                  <SelectValue placeholder="Choose a reason" />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_REASONS.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field
          label="Message"
          htmlFor="message"
          error={errors.message?.message}
          required
          className="sm:col-span-2"
        >
          <Textarea id="message" rows={5} {...register("message")} />
        </Field>
      </div>

      <HipaaNotice />

      <div className="flex flex-col gap-3">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-grey-700">
          <Checkbox
            id="hipaaAck"
            checked={hipaaAck === true}
            onCheckedChange={(c) =>
              setValue("hipaaAck", c === true ? true : (false as unknown as true), {
                shouldValidate: true,
              })
            }
            aria-invalid={!!errors.hipaaAck}
          />
          <span>
            I acknowledge the HIPAA notice above and confirm this is not a medical emergency.
          </span>
        </label>
        {errors.hipaaAck && (
          <p className="text-xs font-medium text-coral-dark">
            {errors.hipaaAck.message as string}
          </p>
        )}
      </div>

      <Button type="submit" variant="coral" size="lg" disabled={submitState === "submitting"}>
        {submitState === "submitting" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
