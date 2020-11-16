module.exports = (res: any, code: number, message: string) => {
  res.status(code).json({
    error: message
  });
};
