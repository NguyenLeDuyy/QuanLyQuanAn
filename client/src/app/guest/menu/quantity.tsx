import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from 'lucide-react'
import React from 'react'

export default function Quantity({
    value,
    onChange,
    disabled
}: {
    value: number,
    onChange: (value: number) => void,
    disabled?: boolean
}) {


    return (
        <div className='flex-shrink-0 ml-auto flex justify-center items-center'>
            <div className='flex gap-1 '>
                <Button className='h-6 w-6 p-0' disabled={disabled || value === 0} onClick={() => onChange(value - 1)}>
                    <Minus className='w-3 h-3' />
                </Button>
                <Input type='text' inputMode='numeric' pattern='[0-9]*' className='h-6 p-1 w-8 text-center'
                    disabled={disabled}
                    value={value}
                    onChange={e => {
                        if (disabled) return
                        const value = e.target.value
                        const numberValue = Number(value)
                        if (isNaN(numberValue))
                            return
                        onChange(numberValue)
                    }}
                />
                <Button className='h-6 w-6 p-0' disabled={disabled} onClick={() => onChange(value + 1)}>
                    <Plus className='w-3 h-3' />
                </Button>
            </div>
        </div>
    )
}
