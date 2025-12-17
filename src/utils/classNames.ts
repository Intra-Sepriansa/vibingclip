export const classNames = (
  ...args: Array<string | false | null | undefined>
): string => args.filter(Boolean).join(' ');
