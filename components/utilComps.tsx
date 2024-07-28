export function Err({ message, onClick }:{message:string, onClick:React.MouseEventHandler<HTMLDivElement>}) {
    return (
      <>
        <div className="flex items-center justify-center p-2 w-full">
          <div className="error pt-2" onClick={onClick}>
            <div className="error__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                viewBox="0 0 24 24"
                height={24}
                fill="none"
              >
                <path
                  fill="#393a37"
                  d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
                />
              </svg>
            </div>
            <div className="error__title">{message}</div>
            <div className="error__close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                viewBox="0 0 20 20"
                height={20}
              >
                <path
                  fill="#393a37"
                  d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
                />
              </svg>
            </div>
          </div>
        </div>
      </>
    );
  }

  export function Comp({ message, onClick }:{message:string, onClick:React.MouseEventHandler<HTMLDivElement>}) {
    return (
      <>
        <div className="flex items-center justify-center p-2 w-full">
          <div className="info pt-2" onClick={onClick}>
            <div className="info__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                viewBox="0 0 24 24"
                height={24}
                fill="none"
              >
                <path
                  fill="#393a37"
                  d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"
                />
              </svg>
            </div>
            <div className="info__title">{message}</div>
            <div className="info__close">
              <svg
                height={20}
                viewBox="0 0 20 20"
                width={20}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
                  fill="#393a37"
                />
              </svg>
            </div>
          </div>
        </div>
      </>
    );
  }