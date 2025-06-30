type RegExpReducible<T> = RegExpStringIterator<T> & { reduce: T[]["reduce"] };

const classMap = new Map<string, string>();

export const getClassName = (className: string) => {
  if (classMap.has(className)) return classMap.get(className)!;

  const baseClasses = className.includes("utc_") ? className.replaceAll(/utc_\S+\s*/g, "").trim() : className;

  const suffixMatch = baseClasses.matchAll(/(\w+?)_/g) as RegExpReducible<RegExpExecArray>;

  const suffix = suffixMatch.reduce((suffix, [_, name]) => `${suffix}_${name}`, "");

  const unified = suffix.length ? `${baseClasses} utc${suffix}` : baseClasses;

  classMap.set(className, unified);

  return unified;
};
