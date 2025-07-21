import http from "@/lib/http";
import queryString from 'query-string';
import { GetOrderDetailResType, GetOrdersQueryParamsType, GetOrdersResType, UpdateOrderBodyType, UpdateOrderResType } from "@/schemaValidations/order.schema";

const orderApiRequest = {
    getOrderList: (queryParams: GetOrdersQueryParamsType) => http.get<GetOrdersResType>('/orders?' + queryString.stringify({
        fromDate: queryParams?.fromDate?.toISOString(),
        toDate: queryParams?.toDate?.toISOString(),
    })),
    updateOrder: (orderId: number, body: UpdateOrderBodyType) => http.put<UpdateOrderResType>(`/orders/${orderId}`, body),
    getOrderDetail: (orderId: number) => http.get<GetOrderDetailResType>(`/orders/${orderId}`)

}

export default orderApiRequest;