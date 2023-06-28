import * as React from "react"
import { forwardRef, memo, Ref, SVGProps } from "react"

const LogoSymbol = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    preserveAspectRatio="xMidYMid meet"
    ref={ref}
    {...props}
  >
    <g fill="none" strokeWidth={2}>
      <path
        stroke="#9da09f"
        d="m129.75 249.04-2.5.25M14.42 129.29c7.26 7.37 13.39 14.03 21.58 21.82 6.29 5.98 11.35 12.27 18.33 18.31 5.96 5.15 15.51 16.1 24.27 24.55 5.11 4.92 9.75 10.82 15.3 15.73q3.77 3.34 6.27 6.06 12.89 14.04 27.39 27.27"
        vectorEffect="non-scaling-stroke"
      />
      <path
        stroke="#838182"
        d="M127.56 243.03q-.1.87.59 1.28a.8.79 36.6 0 0 .98-.14l111.79-116.8a1 1 0 0 0-.02-1.41c-18.64-18.16-36.47-37.16-54.88-55.59-1.3-1.31-2.37-3.23-3.96-4.58-6.83-5.82-13.17-12.54-16.05-16.04-2.79-3.4-6.55-6.32-8.6-8.43q-13.53-13.97-27.3-27.69c-1.45-1.44-3.08-6.58-5.51-2.92q-1.35 2.02-2.09 2.75C112.2 23.52 99.87 36.93 92.59 44.54q-38.16 39.87-76.05 80-2.93 3.1-2.12 4.75"
        vectorEffect="non-scaling-stroke"
      />
      <path
        stroke="#2b2d2d"
        d="M127.56 243.03q.54-33.11-.09-65.92a1.03 1.01 23.8 0 0-.26-.65q-5.95-6.58-12.18-12.11c-2.17-1.92-3.73-3.98-5.63-6.13a.98.97-12.4 0 0-.47-.3q-22.09-6.33-44.04-13.17c-1.86-.58-3.65-1.59-5.65-2.23q-22.22-7.08-44.82-13.23M221.35 109.23q-3.7-4.95-5.42-6.66c-11.24-11.16-23.26-23.19-34.6-35.09a1.02.21 11.5 0 0-.66-.28q-.21-.05-.38-.24-6.31-6.98-13.06-13.55c-2.12-2.05-4.16-4.91-6.52-7.07-8.72-7.97-16.02-17.17-24.73-25.06q-2.64-2.4-5.23-4.85-3.21-3.05-1.62 1.08 4.3 11.16 8.75 23.22c.4 1.08 1.35 2.34 1.89 3.73q9.76 25.21 19.14 50.57c.58 1.57 1.74 2.98 2.28 4.43q4.24 11.45 8.82 22.74 1.2 2.97 3.33 5.23a1.02 1.01-21.5 0 0 .74.32l60.67-.51q4.68-.04 1.59-3.52-5.72-6.44-11.3-11.51c-1.19-1.08-2.63-1.57-3.69-2.98"
        vectorEffect="non-scaling-stroke"
      />
      <path
        stroke="#838182"
        d="M172.05 127.74q-4.3-6-8.8-10.38c-7.96-7.73-15.49-15.75-23.33-23.59-.61-.61-1.67-1.01-2.17-1.54q-4.86-5.2-9.72-10.46a1 .99-45.6 0 0-1.49.02q-4.02 4.63-8.13 9.19c-.67.74-1.45.98-2.07 1.61-6.98 7.05-13.44 14.58-20.45 21.55q-6.79 6.76-13.19 13.87a1 1 0 0 0 .04 1.38q15.85 15.6 31.13 31.73c3.5 3.69 8.81 8.28 12.76 12.96a1 .99-43 0 0 1.48.05c14.36-14.97 28.59-31.24 43.79-45.07a1 1 0 0 0 .15-1.32"
        vectorEffect="non-scaling-stroke"
      />
      <path
        stroke="#838182"
        d="M123.3 163.83q1.74 2.03 3.68 3.9a1 1 0 0 0 1.43-.03q8.7-9.27 17.64-18.31c4.07-4.12 8.84-10.58 12.68-13.68q4.11-3.33 7.57-7.57a.99.99 0 0 0-.04-1.31c-5.5-5.95-11.93-11.66-17.12-17.16Q138.87 98.8 128.01 88.5a1 1 0 0 0-1.41.03q-4.51 4.65-9.24 9.09-3.18 2.99-9.12 9.87-5.09 5.89-15.72 15.93-.63.59-1.79 2.33-.67 1-1.65 1.81a1 1 0 0 0-.1 1.45q4.67 5.07 6.71 6.79 3.29 2.77 9.14 9.62c4.23 4.93 12.14 11.07 18.47 18.41"
        vectorEffect="non-scaling-stroke"
      />
    </g>
    <path
      fill="#f5f4f4"
      d="m129.75 249.04-2.5.25q-.82-.45-2.15-1.89c-8.79-9.54-19.18-19.98-30.15-30.59q-13.19-12.76-15.76-16.25-1.7-2.3-3.42-3.64c-9-6.98-15.96-16.36-24.43-24.09-7.82-7.14-13.87-14.53-21.25-21.36q-4.6-4.27-9.01-9.1-6.19-6.8-13.1-12.89a1 1 0 0 1-.06-1.44q8-8.3 15.79-16.7 8.25-8.91 13.69-14.57 44.15-45.94 87.7-92.23a1 1 0 0 1 1.36-.09c3.95 3.22 7.57 7.39 10.86 10.47q6.14 5.74 11.94 11.81c18.45 19.29 37.75 38.13 56.88 57.85q19.76 20.37 39.73 40.89a1 .99 32.4 0 1 .23 1.02q-.9 2.62-3.76 5.35-11.94 11.38-23.17 23.45c-18.71 20.11-37.9 39.76-57.04 59.45-10.41 10.71-21.24 23.15-32.38 34.3ZM14.42 129.29c7.26 7.37 13.39 14.03 21.58 21.82 6.29 5.98 11.35 12.27 18.33 18.31 5.96 5.15 15.51 16.1 24.27 24.55 5.11 4.92 9.75 10.82 15.3 15.73q3.77 3.34 6.27 6.06 12.89 14.04 27.39 27.27-.1.87.59 1.28a.8.79 36.6 0 0 .98-.14l111.79-116.8a1 1 0 0 0-.02-1.41c-18.64-18.16-36.47-37.16-54.88-55.59-1.3-1.31-2.37-3.23-3.96-4.58-6.83-5.82-13.17-12.54-16.05-16.04-2.79-3.4-6.55-6.32-8.6-8.43q-13.53-13.97-27.3-27.69c-1.45-1.44-3.08-6.58-5.51-2.92q-1.35 2.02-2.09 2.75C112.2 23.52 99.87 36.93 92.59 44.54q-38.16 39.87-76.05 80-2.93 3.1-2.12 4.75Z"
    />
    <path
      fill="#100e10"
      d="M127.56 243.03q.54-33.11-.09-65.92a1.03 1.01 23.8 0 0-.26-.65q-5.95-6.58-12.18-12.11c-2.17-1.92-3.73-3.98-5.63-6.13a.98.97-12.4 0 0-.47-.3q-22.09-6.33-44.04-13.17c-1.86-.58-3.65-1.59-5.65-2.23q-22.22-7.08-44.82-13.23-.81-1.65 2.12-4.75 37.89-40.13 76.05-80c7.28-7.61 19.61-21.02 29.92-31.08q.74-.73 2.09-2.75c2.43-3.66 4.06 1.48 5.51 2.92q13.77 13.72 27.3 27.69c2.05 2.11 5.81 5.03 8.6 8.43 2.88 3.5 9.22 10.22 16.05 16.04 1.59 1.35 2.66 3.27 3.96 4.58 18.41 18.43 36.24 37.43 54.88 55.59a1 1 0 0 1 .02 1.41l-111.79 116.8a.8.79 36.6 0 1-.98.14q-.69-.41-.59-1.28Zm93.79-133.8q-3.7-4.95-5.42-6.66c-11.24-11.16-23.26-23.19-34.6-35.09a1.02.21 11.5 0 0-.66-.28q-.21-.05-.38-.24-6.31-6.98-13.06-13.55c-2.12-2.05-4.16-4.91-6.52-7.07-8.72-7.97-16.02-17.17-24.73-25.06q-2.64-2.4-5.23-4.85-3.21-3.05-1.62 1.08 4.3 11.16 8.75 23.22c.4 1.08 1.35 2.34 1.89 3.73q9.76 25.21 19.14 50.57c.58 1.57 1.74 2.98 2.28 4.43q4.24 11.45 8.82 22.74 1.2 2.97 3.33 5.23a1.02 1.01-21.5 0 0 .74.32l60.67-.51q4.68-.04 1.59-3.52-5.72-6.44-11.3-11.51c-1.19-1.08-2.63-1.57-3.69-2.98Zm-49.3 18.51q-4.3-6-8.8-10.38c-7.96-7.73-15.49-15.75-23.33-23.59-.61-.61-1.67-1.01-2.17-1.54q-4.86-5.2-9.72-10.46a1 .99-45.6 0 0-1.49.02q-4.02 4.63-8.13 9.19c-.67.74-1.45.98-2.07 1.61-6.98 7.05-13.44 14.58-20.45 21.55q-6.79 6.76-13.19 13.87a1 1 0 0 0 .04 1.38q15.85 15.6 31.13 31.73c3.5 3.69 8.81 8.28 12.76 12.96a1 .99-43 0 0 1.48.05c14.36-14.97 28.59-31.24 43.79-45.07a1 1 0 0 0 .15-1.32Z"
    />
    <path
      fill="#454b49"
      d="M221.35 109.23c1.06 1.41 2.5 1.9 3.69 2.98q5.58 5.07 11.3 11.51 3.09 3.48-1.59 3.52l-60.67.51a1.02 1.01-21.5 0 1-.74-.32q-2.13-2.26-3.33-5.23-4.58-11.29-8.82-22.74c-.54-1.45-1.7-2.86-2.28-4.43q-9.38-25.36-19.14-50.57c-.54-1.39-1.49-2.65-1.89-3.73q-4.45-12.06-8.75-23.22-1.59-4.13 1.62-1.08 2.59 2.45 5.23 4.85c8.71 7.89 16.01 17.09 24.73 25.06 2.36 2.16 4.4 5.02 6.52 7.07q6.75 6.57 13.06 13.55.17.19.38.24a1.02.21 11.5 0 1 .66.28c11.34 11.9 23.36 23.93 34.6 35.09q1.72 1.71 5.42 6.66Z"
    />
    <path
      fill="#f5f4f4"
      d="M172.05 127.74a1 1 0 0 1-.15 1.32c-15.2 13.83-29.43 30.1-43.79 45.07a1 .99-43 0 1-1.48-.05c-3.95-4.68-9.26-9.27-12.76-12.96q-15.28-16.13-31.13-31.73a1 1 0 0 1-.04-1.38q6.4-7.11 13.19-13.87c7.01-6.97 13.47-14.5 20.45-21.55.62-.63 1.4-.87 2.07-1.61q4.11-4.56 8.13-9.19a1 .99-45.6 0 1 1.49-.02q4.86 5.26 9.72 10.46c.5.53 1.56.93 2.17 1.54 7.84 7.84 15.37 15.86 23.33 23.59q4.5 4.38 8.8 10.38Zm-48.75 36.09q1.74 2.03 3.68 3.9a1 1 0 0 0 1.43-.03q8.7-9.27 17.64-18.31c4.07-4.12 8.84-10.58 12.68-13.68q4.11-3.33 7.57-7.57a.99.99 0 0 0-.04-1.31c-5.5-5.95-11.93-11.66-17.12-17.16Q138.87 98.8 128.01 88.5a1 1 0 0 0-1.41.03q-4.51 4.65-9.24 9.09-3.18 2.99-9.12 9.87-5.09 5.89-15.72 15.93-.63.59-1.79 2.33-.67 1-1.65 1.81a1 1 0 0 0-.1 1.45q4.67 5.07 6.71 6.79 3.29 2.77 9.14 9.62c4.23 4.93 12.14 11.07 18.47 18.41Z"
    />
    <path
      fill="#100e10"
      d="M123.3 163.83c-6.33-7.34-14.24-13.48-18.47-18.41q-5.85-6.85-9.14-9.62-2.04-1.72-6.71-6.79a1 1 0 0 1 .1-1.45q.98-.81 1.65-1.81 1.16-1.74 1.79-2.33 10.63-10.04 15.72-15.93 5.94-6.88 9.12-9.87 4.73-4.44 9.24-9.09a1 1 0 0 1 1.41-.03q10.86 10.3 21.13 21.17c5.19 5.5 11.62 11.21 17.12 17.16a.99.99 0 0 1 .04 1.31q-3.46 4.24-7.57 7.57c-3.84 3.1-8.61 9.56-12.68 13.68q-8.94 9.04-17.64 18.31a1 1 0 0 1-1.43.03q-1.94-1.87-3.68-3.9Z"
    />
    <path
      fill="#454b49"
      d="M127.56 243.03q-14.5-13.23-27.39-27.27-2.5-2.72-6.27-6.06c-5.55-4.91-10.19-10.81-15.3-15.73-8.76-8.45-18.31-19.4-24.27-24.55-6.98-6.04-12.04-12.33-18.33-18.31-8.19-7.79-14.32-14.45-21.58-21.82q22.6 6.15 44.82 13.23c2 .64 3.79 1.65 5.65 2.23q21.95 6.84 44.04 13.17a.98.97-12.4 0 1 .47.3c1.9 2.15 3.46 4.21 5.63 6.13q6.23 5.53 12.18 12.11a1.03 1.01 23.8 0 1 .26.65q.63 32.81.09 65.92ZM129.75 249.04q-1.23 2.03-2.5.25l2.5-.25Z"
    />
  </svg>
)
const ForwardRef = forwardRef(LogoSymbol)
const Memo = memo(ForwardRef)
export default Memo
export { Memo as LogoSymbol }