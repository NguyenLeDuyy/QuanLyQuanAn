import accountApiRequest from "@/apiRequests/account"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useAccountMeMutation = () => {
    return useQuery({
        queryKey: ['account-me'],
        queryFn: accountApiRequest.me
    })
}

export const useUpdateMeMutation = () => {
    return useMutation({
      mutationFn: accountApiRequest.updateMe,
    });
}