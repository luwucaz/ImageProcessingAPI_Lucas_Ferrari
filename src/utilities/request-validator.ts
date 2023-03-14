import { Request } from 'express';

export const REGEXP_TYPES_VALIDATOR = {
  INTEGER: {
    name: 'integer',
    regularExpression: /^[0-9]*$/,
  },
};

interface ShouldMatchType {
  name: string;
  regularExpression: RegExp;
}

export interface PropertyValidation {
  field: string;
  required: boolean;
  shouldMatchType?: ShouldMatchType;
}

export function validateRequest(
  properties: { query: PropertyValidation[] },
  fromInput: Request
) {
  const missingProperties = validateMissingProperties(
    properties.query,
    fromInput
  );

  const wrongTypeProperties = validateWrongTypeProperties(
    properties.query,
    fromInput
  );

  if (missingProperties.length === 0 && wrongTypeProperties.length === 0) {
    return;
  }

  const errors = mountErrors(missingProperties, wrongTypeProperties);

  throw {
    code: 400,
    message: JSON.stringify(errors),
  };
}

function validateMissingProperties(
  properties: PropertyValidation[],
  fromInput: Request
) {
  return properties.filter(
    (property) => property.required && !fromInput.query[property.field]
  );
}

function validateWrongTypeProperties(
  properties: PropertyValidation[],
  fromInput: Request
) {
  return properties.filter((property) => {
    const data = fromInput.query[property.field];

    const { shouldMatchType } = property;

    if (!data || !shouldMatchType) {
      return false;
    }

    const { regularExpression } = shouldMatchType;

    return !regularExpression.test(data.toString());
  });
}

function mountErrors(
  missingProperties: PropertyValidation[],
  wrongTypeProperties: PropertyValidation[]
): string[] {
  const errors = [
    missingProperties.map((property) => `${property.field} is required`),

    wrongTypeProperties.map(
      (property) =>
        `${property.field} should be ${property.shouldMatchType?.name}`
    ),
  ].flat();

  return errors;
}
