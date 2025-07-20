import http from "@/lib/http";
import { CreateOrdersResType, UpdateOrderBodyType, UpdateOrderResType } from "@/schemaValidations/order.schema";

const orderApiRequest = {
    getOrderList: () => http.get<CreateOrdersResType>('/orders'),
    updateOrder: (orderId: number, body: UpdateOrderBodyType) => http.put<UpdateOrderResType>(`/orders/${orderId}`, body),

}

export default orderApiRequest;