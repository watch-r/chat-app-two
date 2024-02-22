import { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
    return (
        <main className='h-screen flex items-center justify-center p-10  '>
            <div className=' text-white flex items-center justify-center flex-col rounded-md'>
                {children}
                <p className='mt-4 text-xs dark:text-slate-200 text-slate-600'>
                    @2024 All rights reserved
                </p>
            </div>
        </main>
    );
};

export default layout;
