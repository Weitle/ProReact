import sumValues from './sum';

export function asyncAdd(values){
  return new Promise(callback=>{
    setTimeout(()=>{
      let result = sumValues(values);
      console.log(`Async Total: ${result}`);
      callback(result);
    }, 500);
  });
  
}