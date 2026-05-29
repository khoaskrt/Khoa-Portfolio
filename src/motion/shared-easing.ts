export const ease = {
  expoOut: [0.16, 1, 0.3, 1] as const,
  quartOut: [0.25, 1, 0.5, 1] as const,
  quintOut: [0.22, 1, 0.36, 1] as const,
} as const;

export const duration = {
  entrance: 1,
  reveal: 0.64,
  interaction: 0.36,
  hover: 0.22,
  fast: 0.14,
} as const;
