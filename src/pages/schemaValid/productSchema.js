import * as z from "zod";

const productSchame = z.object({
  title: z.string().min(6).max(100),
  price: z.number().min(0),
  description: z.string().optional(),
});

export default productSchame;
