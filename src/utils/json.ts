const JSON_INDENTATION = 2;

export const parseJson = <TData>(jsonString: string): TData | null => {
  try {
    return JSON.parse(jsonString) as TData;
  } catch {
    return null;
  }
};

export const formatJson = (json: any): string => {
  return json ? JSON.stringify(json, null, JSON_INDENTATION) : null;
};
