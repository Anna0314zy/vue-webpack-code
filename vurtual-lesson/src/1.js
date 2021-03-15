const curring = (fn, arr = []) => {
    console.log(fn.length,'---------')
    let len = fn.length;
    return function(...args) {
      const newArgs = [...arr, ...args];
      if (newArgs.length === len) {
        return fn(...newArgs);
      } else {
        return curring(fn, newArgs);
      }
    };
  };
  function sum(...args) {
      console.log(args,'args--')
    return args.reduce((a,b) => a + b);
  }
  let newSum = curring(sum);
  console.log(newSum(1, 3, 3)(4, 5));
  console.log(newSum(1)(2)(3)(4)(4));