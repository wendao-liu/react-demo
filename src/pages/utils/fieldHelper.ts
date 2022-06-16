export function transformField(
  item: { id: string; props: string },
  selectMappingSetFunc: any,
) {
  let field: any = {};
  field.id = item.id;
  try {
    field.props = JSON.parse(item.props);
    if (
      field.props.defaultScope !== undefined &&
      field.props.defaultScope !== null
    ) {
      field.props.defaultScope = field.props.defaultScope + '';
    }
  } catch (e) {
    field.props = {};
    console.error(field.id, 'props is not a json string');
  }
  try {
    const fieldMorePropsJSON: string = _.result(
      field,
      'props.fieldProps.fieldMoreProps',
    );
    if (fieldMorePropsJSON) {
      const fieldMoreProps = JSON.parse(fieldMorePropsJSON);
      delete field.props.fieldProps.fieldMoreProps;
      field.props.fieldProps = {
        ...field.props.fieldProps,
        ...fieldMoreProps,
      };
    }
  } catch (e) {
    console.error(field.id, 'fieldProps.fieldMoreProps is not a json string');
  }
  try {
    if (
      field.props.fieldProps &&
      field.props.fieldProps.selectDataSourceType === 'enum' &&
      field.props.fieldProps.enumDicAppCode &&
      field.props.fieldProps.enumDicElementName
    ) {
      return field;
    } else {
      const selectQueryMapJSON: string = _.result(
        field,
        'props.fieldProps.selectQueryMap',
      );
      let selectQueryMap = JSON.parse(selectQueryMapJSON);
      field.props.list = selectQueryMap;
      selectMappingSetFunc(field.id, selectQueryMap);
    }
  } catch (e) {}
  return field;
}
