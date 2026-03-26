export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');
export const makeId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
export const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
export const stars = (rating: number) => '?'.repeat(rating) + '?'.repeat(5 - rating);

