import { irs } from '@idx/toolkit';
import type { IrsUserRequestConfig } from '@idx/toolkit/es/irs/types';

const customVo = {
  modelId: 'services_portal',
  // pageName: 'membership_management_person_account_list',
  // portletName: 'portal_membership_management_person_account_list',

  pageName: 'membership_management_company_account_list',
  portletName: 'portal_membership_management_company_account_list',
  dzgAppCode: 'gm2',
};

const formData = new FormData();
for (const key in customVo) {
  formData.append(key, customVo[key]);
}

const request = async (params: IrsUserRequestConfig) => {
  const result = (await irs.request(params)) as any;
  return result?.data?.data;
};

//获取用户基石columns
export const getUserColumns = () => {
  return request({
    url: `dzgcommons-rest/fs/getUserColumns`,
    method: 'post',
    data: formData,
    headers: {
      dzgappcode: 'gm2',
    },
  });
};

// 获取columns过滤条件
export const getColumnsQuery = () => {
  return request({
    url: `/dzgcommons-rest/fs/getColumnsQuery?_method=get`,
    method: 'post',
    data: formData,
    headers: {
      dzgappcode: 'gm2',
    },
  });
};
