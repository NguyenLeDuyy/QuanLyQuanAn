'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useGetDishListQuery } from '@/queries/useDish'
import { cn, formatCurrency, handleErrorApi } from '@/lib/utils'
import Quantity from '@/app/guest/menu/quantity'
import { useMemo, useState } from 'react'
import { GuestCreateOrdersBodyType } from '@/schemaValidations/guest.schema'
import { useGuestGetOrderListQuery, useGuestOrderMutation } from '@/queries/useGuest'
import { useRouter } from 'next/navigation'
import { DishStatus } from '@/constants/type'

export default function MenuOrder() {
    const { data } = useGetDishListQuery()
    // console.log(data?.payload.data)
    const dishes = useMemo(() => data?.payload.data ?? [], [data?.payload.data])
    const [orders, setOrders] = useState<GuestCreateOrdersBodyType>([])
    const { mutateAsync } = useGuestOrderMutation()
    const { refetch } = useGuestGetOrderListQuery()
    const router = useRouter();
    const totalPrice = useMemo(() => {
        return dishes.reduce((result, dish) => {
            const order = orders.find((order) => order.dishId === dish.id)
            if (!order) return result
            return result + order.quantity * dish.price
        }, 0)
    }, [dishes, orders])
    const handleQuantityChange = (dishId: number, quantity: number) => {
        setOrders((prevOrders) => {
            // Nếu số lượng bằng 0, xóa món ăn khỏi danh sách orders
            if (quantity === 0) {
                return prevOrders.filter((order) => order.dishId !== dishId)
            }
            const index = prevOrders.findIndex((order) => order.dishId === dishId)
            // Nếu món ăn chưa có trong danh sách orders, thêm mới vào
            if (index === -1) {
                return [...prevOrders, { dishId, quantity }]
            }
            const newOrders = [...prevOrders]
            newOrders[index] = { ...newOrders[index], quantity }
            return newOrders
        })
    }
    // console.log(orders)

    const handleOrder = async () => {
        try {
            await mutateAsync(orders)
            refetch();
            router.push('/guest/orders')
        } catch (error) {
            handleErrorApi({ error })
        }
    }
    return (
        <>
            {dishes.filter(dish => dish.status !== DishStatus.Hidden).map((dish) => (
                <div key={dish.id} className={cn('flex gap-4', { 'pointer-events-none': dish.status === DishStatus.Unavailable })}>
                    <div className='flex-shrink-0 relative'>
                        <span className='absolute inset-0 flex items-center justify-center text-white text-sm'>
                            {dish.status === DishStatus.Unavailable && 'Hết hàng'}
                        </span>
                        <Image
                            src={dish.image}
                            alt={dish.name}
                            height={100}
                            width={100}
                            quality={100}
                            className='object-cover w-[80px] h-[80px] rounded-md'
                        />
                    </div>
                    <div className='space-y-1'>
                        <h3 className='text-sm'>{dish.name}</h3>
                        <p className='text-xs'>{dish.description}</p>
                        <p className='text-xs font-semibold'>{formatCurrency(dish.price)}</p>
                    </div>
                    <Quantity
                        onChange={(value) => handleQuantityChange(dish.id, value)}
                        value={orders.find((order) => order.dishId === dish.id)?.quantity ?? 0}
                    />
                </div>
            ))}
            <div className='sticky bottom-0'>
                <Button className='w-full justify-between' onClick={handleOrder}
                    disabled={orders.length === 0}
                >
                    <span>Đặt hàng · {orders.length} món</span>
                    <span>{formatCurrency(totalPrice)}</span>
                </Button>
            </div>
        </>
    )
}
