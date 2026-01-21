import { z } from "zod";

export const memorySchema = z.object({
    caption: z.string().min(1, "Caption is required").max(500, "Caption too long"),
    image: z.any().refine((file) => file instanceof File, "Image is required"),
});

export type MemoryFormValues = z.infer<typeof memorySchema>;
