import controls from './controls';
import FormField from './FormField';
import { getValidateRules, pick, omit } from './common/utils';

/**
 * 根据json对象生成FormField
 * @param jsonObj
 */
export const generateFormField = (jsonObj) => {
  const fieldPropKeys = ['name', 'label', 'labelWidth', 'tips', 'required', 'defaultValue', 'rules'];
  const fieldProps = pick(jsonObj, fieldPropKeys);
  if('rules' in fieldProps){
    fieldProps.rules = getValidateRules(fieldProps.rules);
  }
  const Control = controls[jsonObj.control];
  const controlProps = omit(jsonObj, fieldPropKeys, 'control');
  return (
    <FormField {...fieldProps}>
      <Control {...controlProps} />
    </FormField>
  );
};