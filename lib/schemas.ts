import { z } from "zod";

const phoneRegex = /^[\d\s().+\-]{7,}$/;

export const referralSchema = z.object({
  referringFirstName: z.string().min(1, "First name is required"),
  referringLastName: z.string().min(1, "Last name is required"),
  practice: z.string().optional().or(z.literal("")),
  referringFax: z
    .string()
    .regex(phoneRegex, "Enter a valid fax number")
    .optional()
    .or(z.literal("")),
  referringPhone: z.string().regex(phoneRegex, "Enter a valid phone number"),
  referringEmail: z
    .string()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  patientName: z.string().min(2, "Patient name is required"),
  patientDob: z.string().min(1, "Patient date of birth is required"),
  insuranceCarrier: z.string().min(2, "Insurance carrier is required"),
  memberId: z.string().min(1, "Member ID is required"),
  medication: z.string().min(2, "Medication is required"),
  dose: z.string().optional().or(z.literal("")),
  indication: z.string().min(2, "Clinical indication is required"),
  premedications: z.string().optional().or(z.literal("")),
  allergies: z.string().optional().or(z.literal("")),
  recentLabs: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
  hipaaAck: z.literal(true, {
    errorMap: () => ({ message: "Please acknowledge the HIPAA notice" }),
  }),
});

export type ReferralInput = z.infer<typeof referralSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().regex(phoneRegex, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  reason: z.enum(["schedule", "treatment", "billing", "referral", "other"], {
    errorMap: () => ({ message: "Please choose a reason" }),
  }),
  message: z.string().min(5, "Please add a brief message").max(2000),
  hipaaAck: z.literal(true, {
    errorMap: () => ({ message: "Please acknowledge the HIPAA notice" }),
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
