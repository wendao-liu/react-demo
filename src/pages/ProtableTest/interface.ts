export type TScope = {
  [key: string]: string;
};

export type TFieldType =
  | 'SimpleInput'
  | 'SimpleSelect'
  | 'DateInfo'
  | 'DateSelect'
  | 'NumberRange'
  | 'SimpleTagInput'
  | 'CascaderSelect';
export type TMode =
  | 'range_picker'
  | 'input_tags'
  | 'default'
  | 'split'
  | string;

export type TRangeType = 'date' | 'week' | 'month' | 'quarter' | 'year';
export type TRangeScopeType = '0' | '4' | '1' | '2' | '3'; //'date' | 'week' | 'month' | 'quarter' | 'year'

export interface APIFieldProps {
  comPortletSetId?: string;
  customField?: boolean;
  defaultField?: boolean;
  defaultScope?: number | string;
  scopes?: any;
  fieldCn?: string;
  fieldEn?: string;
  fieldProps?: any;
  fieldQuery?: string;
  fieldType?: TFieldType;
  filterField?: boolean; //是否禁用
  id?: number | string;
  selectAllEnabled?: boolean;
  userId?: number;
  valueLength?: number;
  scopesLabel?: string[];
  [key: string]: any;
}

export interface IAPIField {
  id: string;
  props: APIFieldProps;
  queryCount?: number;
  selectAllEnabled?: boolean;
}

export interface IAPIAll {
  id: string;
  props: string;
  queryCount?: number;
  selectAllEnabled?: boolean;
}

export interface IFieldProps {
  mode?: TMode;
  fieldCn: string;
  fieldEn: string;
  fieldQuery: string;
  fieldType: TFieldType;
  selectAllEnabled: boolean;
  list: any[];
  modeType: 'input' | 'default' | string;
  min: number;
  max: number;
  precision: number;
  size: 'small' | 'middle' | 'large';
  className: string;
  selectKey?: string;
  selectValue?: string;
  selectQueryUrl?: string;
  selectQueryMap?: string;
  fieldMoreProps?: string;
  selectChildKey?: string;
  cascaderList?: TCascaderList[];
  cascaderRequired?: boolean;
  [key: string]:  any;
}

export type TCascaderList = {
  selectKey?: string;
  selectValue?: string;
  selectQueryUrl?: string;
  cascaderSearchKey?: string;
};

export interface IFieldValue {
  queryField: string;
  queryType: TFieldType;
  queryValues: string[];
}


export interface IQueryObject {
  queryType: TFieldType;
  queryField: string;
  fieldId: string;
  queryFieldIndex: number;
  scope: string;
  scopeDisplayValue?: string;
  queryValues: string[] | string[][];
  templateFieldValue: string[][];
  mapQueryValues: string[];
  formFieldValue?: string[] | string[][];
  label?: string;
  displayValue?: string;
  displayText?: string;
  isTemplateData?: boolean;
  dbFieldType?: string;
}

export interface ITemplateObject {
  fieldNum: number;
  fieldCn: string;
  fieldEn: string;
  fieldType: TFieldType;
  fieldQuery: string;
  scope: string;
  fieldValue: string[] | string[][];
  valueMapping?: { [key: string]: string };
  cascaderMappingList?: TCascaderMappingList;
}

export type TCascaderMappingList = {
  [key: string]: TSelectMap[];
};

export type TSelectMap = {
  [key: string]: string | number;
};

export interface IValidator {
  (rule: any[], value: any, callback: (text?: string) => void): void;
}

export type TOption = {
  [key: string]: any;
};

export type TGetOptionParams = {
  options: TOption[];
  value: string | number;
  mapping: TSelectMap;
  selectMapping?: TOption[];
};

export type TMomentType = 'day' | 'month' | 'year';

export interface IFormValueObject {
  queryField?: string;
  queryValues?: string[] | string | string[][];
  queryType?: TFieldType;
  scope?: string;
  scopeDisplayValue?: string;
  multiQueryValues?: string[][];
}

export interface IValueObject extends Omit<IFormValueObject, 'queryValues'> {
  queryValues?: string[] | string | string[][];
}

export type TAllConditions = {
  [key: string]: IAPIField;
};

export type TConditionSelect = {
  code: string;
  name: string;
}[];

export type TForm = {
  validateFields: (nameList?: string[]) => Promise<{ [key: string]: any }>;
  [key: string]: any;
};

export interface IStatusFilter {
  appCode?: string;
  createDate?: string;
  defaultStatus?: boolean;
  id: number | string;
  modelId?: string;
  modifiedDate?: string;
  orderNo?: number;
  orgId?: number;
  pageName?: string;
  portletName?: string;
  props: string | any;
  sortBy?: 'desc' | 'asc';
  sortField?: string;
  sortFieldCn?: string;
  statusName: string;
  visible?: boolean;
  fieldList?: IStatusField[];
  'scope-fieldList'?: { queryValues: string }[];
  isKeepAppCode?: boolean;
}

export interface IStatusField {
  fieldId: string;
  queryField: string;
  queryFieldName: string;
  queryType: string;
  queryValueNames: string[];
  queryValues: string | (string | string[])[];
  id?: string;
  queryValuesDoubleArray?: string[];
  scope?: string;
}

export type TSortField = {
  sortField: string;
  sortFieldCnName: string;
};

export interface IStatusSetting {
  maxStatusFilterNumber: number;
  sortFields: TSortField[];
  statusFilterEnabled: boolean;
}

export interface IMySearchTemplateData {
  advancedcondition: string;
  id: number;
  orgId?: string;
  templateName: string;
  templateTableName?: string;
  templateType?: number;
  updateTime?: string;
  userId?: string;
}

export type TUrlMap = {
  getAdSearchConditionUrl?: string; //获取高级查询参数url
  saveMySearchUrl?: string; //保存我的查询url
  deleteMySearchUrl?: string; //删除我的查询url
  getMySearchUrl?: string; //获取我的查询url
  saveDefaultColumnsQueryUrl?: string; //保存默认查询条件 url
  updateQueryCountUrl?: string; //保存条件查询次数 url
  getFilterStatusByIdUrl?: string; //获取自定义状态信息 url
  updateFilterStatusUrl?: string; //更新单个自定义状态 url
  removeStatusUrl?: string; //删除自定义状态 url
  updateStatusListUrl?: string; //更新多个自定义状态 url
};

export interface IUpdateDefaultConditionsIds {
  (type: 'delete' | 'add', index?: number): void;
}

export interface ISetCacheDefaultConditionsIds {
  (index: number, id: string | null): void;
}

export type TFootQuery = {
  queryField: string;
  queryType: TFieldType;
  queryValues: string[] | string[][];
  scope: string;
};
