import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'OnlyOneOf', async: false })
export class OnlyOneOfConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];

    const hasThis      = value !== null && value !== undefined;
    const hasRelated   = relatedValue !== null && relatedValue !== undefined;

    return (!hasThis && !hasRelated) || (hasThis && !hasRelated) || (!hasThis && hasRelated);
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${args.property}와 ${relatedPropertyName}는 동시에 사용할 수 없습니다. 하나만 지정하거나 둘 다 생략하세요.`;
  }
}
