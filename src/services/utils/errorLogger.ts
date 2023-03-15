// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function errorLogger(err: any) {
  const errorObj = Object.keys(err).reduce(
    (obj, key) => ({ ...obj, [key]: err[key] }),
    {
      message: err.toString(),
      trace: err.stack,
    },
  );
  // eslint-disable-next-line no-console
  console.log(errorObj);
}
