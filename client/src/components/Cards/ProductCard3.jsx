import { Button } from '@/components/ui/button'
import React from 'react'

const ProductCard3 = () => {
  return (
    <div className='w-[323px] h-[422px] flex flex-col rounded-lg py-6 ml-4  bg-cover items-center justify-between'  style={{backgroundImage:'url(https://s3-alpha-sig.figma.com/img/a7af/7f21/5bb3359e39a6800af5f5edbc7e423157?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JLnsNxlf17QWOtR~qme37HUlL8vaZVNWLLxLBUNGxB5zxFLazFp1W-WuGVc1sOy4GfJTRZy8W8ynFS0k2i1qodzb-kYnNu4MAA-FBT3rdopIjCRtQeMSqp0ZyQOqpSFqCMov3lcUKZG2ql68yfyCDpjA~XTUIzwNWWQMCLYYtYaD-gEqTtKAi7SG~~o68~uyATLle8PaW7B-kpcipz-kirjp4PAvPWPxMkiykopWeE5X0OapA9HYKCXI7XI3C~hVGnc5BoFiNwlajL7gi2YbipQXxqL7wT89LAQ~~FJBTOTpYHcLIahRrIaNU0dQnowZS9dNimW-m357RCc-sAKWsA__)'}}>
        <div className='text-[30px] text-white'>
            Necklaces
        </div>
        <div>
        <Button className="bg-transparent opacity-50 border-[1px] mt-3 w-[176px] h-[62px] rounded-[5px] font-Inter text-[20px] hover:opacity-100 hover:bg-white hover:text-[#2C2C2C] text-white  ">
          Explore now
        </Button>
        </div>
    </div>
  )
}

export default ProductCard3