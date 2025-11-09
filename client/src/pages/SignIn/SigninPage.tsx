import SigninFrom from "./components/SigninFrom"

const Signin = () => {
    return (
        <div className='min-h-dvh grid place-items-center p-4'>
            <div className="w-full max-w-sm bg-neutral-300 p-4 rounded-xl">
                <SigninFrom onSubmit={(data) => {
                    console.log(data)
                }} />
            </div>
        </div>
    )
}

export default Signin