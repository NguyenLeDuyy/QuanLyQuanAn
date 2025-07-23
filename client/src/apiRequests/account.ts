import http from "@/lib/http";
import { AccountListResType, AccountResType, CreateEmployeeAccountBodyType, CreateGuestBodyType, CreateGuestResType, GetGuestListQueryParamsType, GetListGuestsResType, UpdateEmployeeAccountBodyType, UpdateMeBodyType } from "@/schemaValidations/account.schema";
import queryString from "query-string";

const prefix = '/accounts'

const accountApiRequest = {
    me: () => http.get<AccountResType>(`${prefix}/me`),
    updateMe: (body: UpdateMeBodyType) => http.put<AccountResType>(`${prefix}/me`, body),

    list: () => http.get<AccountListResType>(`${prefix}`),
    addEmployee: (body: CreateEmployeeAccountBodyType) => http.post<AccountResType>(prefix, body),
    updateEmployee: (id: number, body: UpdateEmployeeAccountBodyType) => http.put<AccountResType>(`${prefix}/detail/${id}`, body),
    deleteEmployee: (id: number) => http.delete<AccountResType>(`${prefix}/detail/${id}`),
    getEmployee: (id: number) => http.get<AccountResType>(`${prefix}/detail/${id}`),
    guestList: (queryParams: GetGuestListQueryParamsType) => http.get<GetListGuestsResType>(`${prefix}/guests?` + queryString.stringify({
        fromDate: queryParams.fromDate?.toISOString(),
        toDate: queryParams.toDate?.toISOString(),
    })),
    createGuest: (body: CreateGuestBodyType) => http.post<CreateGuestResType>(`${prefix}/guests`, body)
}

export default accountApiRequest